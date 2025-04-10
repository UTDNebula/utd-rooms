'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import Filters from '@/components/Filters';
import ResultsTable from '@/components/ResultsTable';
import TopMenu from '@/components/TopMenu';
import type { AstraEvent, CourseBookEvent, Hierarchy } from '@/types/Events';
import type { Rooms } from '@/types/Rooms';

interface Props {
  date: string;
  rooms: Rooms;
  courseBookEvents: Hierarchy<CourseBookEvent>;
  astraEvents: Hierarchy<AstraEvent>;
}

/**
 * Returns the results page with Nebula Branding, and room availability
 */
export default function Results(props: Props) {
  const [search, setSearch] = useState('');

  const searchParams = useSearchParams();

  let startTime = searchParams.get('startTime');
  if (Array.isArray(startTime)) {
    startTime = startTime[0];
  }
  let endTime = searchParams.get('endTime');
  if (Array.isArray(endTime)) {
    endTime = endTime[0];
  }

  const buildingsParam = searchParams.get('buildings');
  const buildings = buildingsParam ? buildingsParam.split(',') : [];

  const onlyAvailFullTime = searchParams.get('onlyAvailFullTime') === 'true';

  return (
    <>
      <TopMenu search={search} setSearch={setSearch} />
      <main className="p-4 flex flex-col gap-4">
        <Filters
          roomsLoading={false}
          date={props.date}
          startTime={startTime}
          endTime={endTime}
          buildings={buildings}
          onlyAvailFullTime={onlyAvailFullTime}
          rooms={props.rooms}
        />
        <ResultsTable
          date={props.date}
          startTime={startTime}
          endTime={endTime}
          buildings={buildings}
          onlyAvailFullTime={onlyAvailFullTime}
          rooms={props.rooms}
          courseBookEvents={props.courseBookEvents}
          astraEvents={props.astraEvents}
          search={search}
        />
      </main>
    </>
  );
}
