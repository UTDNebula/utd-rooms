import { useState } from 'react';

import type { Hierarchy } from '@/types/Events';
import type { GenericFetchedData } from '@/types/GenericFetchedData';

//Fetch event data from Nebula API
function fetchEventsData<T>(
  route: string,
  date: string,
  controller: AbortController,
): Promise<Hierarchy<T>> {
  return fetch(
    '/api/events?route=' +
      encodeURIComponent(route) +
      '&date=' +
      encodeURIComponent(date),
    {
      signal: controller.signal,
    },
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.message !== 'success') {
        throw new Error(response.message);
      }
      return response.data;
    });
}

export type HierarchyStore<T> = {
  [key: string]: GenericFetchedData<Hierarchy<T>>;
};

export default function useEventsStore<T>(
  route: string,
): [HierarchyStore<T>, (date: string, controller: AbortController) => void] {
  const [events, setEvents] = useState<HierarchyStore<T>>({});

  function addToEvents(key: string, value: GenericFetchedData<Hierarchy<T>>) {
    setEvents((old) => {
      return { ...old, [key]: value };
    });
  }

  //Call fetchEventsData and store response
  function fetchAndStoreEventData(date: string, controller: AbortController) {
    if (typeof events[date] !== 'undefined' && events[date].state !== 'error') {
      return;
    }
    addToEvents(date, { state: 'loading' });
    fetchEventsData<T>(route, date, controller)
      .then((res: Hierarchy<T>) => {
        //Add to storage
        //Set loading status to done
        addToEvents(date, {
          state: 'done',
          data: res,
        });
      })
      .catch(() => {
        //Set loading status to error
        addToEvents(date, { state: 'error' });
      });
  }

  return [events, fetchAndStoreEventData];
}
