import type { Hierarchy } from '@/types/Events';
import type { GenericFetchedData } from '@/types/GenericFetchedData';

export default async function fetchEvents<T>(
  route: string,
  date: string,
): Promise<GenericFetchedData<Hierarchy<T>>> {
  const API_KEY = process.env.REACT_APP_NEBULA_API_KEY;
  if (typeof API_KEY !== 'string') {
    return { message: 'error', error: 'API key is undefined' };
  }

  try {
    const url = new URL(route + '/' + date, 'https://api.utdnebula.com/');
    const res = await fetch(url.href, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        Accept: 'application/json',
      },
      next: { revalidate: 3600 },
    });

    const data = await res.json();

    if (data.message !== 'success') {
      if (data.error === 'mongo: no documents in result') {
        return { message: 'success', data: {} };
      }
      throw new Error(data.error ?? data.message);
    }

    // Convert from array to object
    const eventsMap: Hierarchy<T> = {};
    for (const building of data.data.buildings) {
      eventsMap[building.building] = {};
      for (const room of building.rooms) {
        eventsMap[building.building][room.room] = room.events;
      }
    }

    return { message: 'success', data: eventsMap };
  } catch (error) {
    return {
      message: 'error',
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
