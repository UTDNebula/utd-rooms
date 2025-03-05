import { useRouter } from 'next/router';
import React from 'react';

import type { HierarchyStore } from '@/modules/useEventsStore';
import type { CourseBookEvent } from '@/types/Events';
import type { GenericFetchedData } from '@/types/GenericFetchedData';
import type { Rooms } from '@/types/Rooms';

/**
 * Props type used by the TopMenu component
 */
interface Props {
  rooms: GenericFetchedData<Rooms>;
  courseBookEvents: HierarchyStore<CourseBookEvent>;
  search: string;
}

/**
 * This is a component to hold results for room availablity in a table
 */
export function ResultsTable(props: Props) {
  console.log(
    'rooms',
    props.rooms,
    'courseBookEvents',
    props.courseBookEvents,
    'search',
    props.search,
  );

  //For getting filters
  const router = useRouter();

  let date = router.query.date;
  if (Array.isArray(date)) {
    date = date[0]; // if date is an array, make it a string
  }

  let startTime = router.query.startTime;
  if (Array.isArray(startTime)) {
    startTime = startTime[0];
  }

  let endTime = router.query.endTime;
  if (Array.isArray(endTime)) {
    endTime = endTime[0];
  }

  let buildings = router.query.buildings ?? [];
  if (!Array.isArray(buildings)) {
    buildings = buildings.split(','); // if buildings is a comma-delimited string, make it an array
  }

  console.log(
    date,
    startTime,
    endTime,
    buildings,
    router.query.onlyAvailFullTime,
  );

  return <>ResultsTable</>;
}

export default ResultsTable;
