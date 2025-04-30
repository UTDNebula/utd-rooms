'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

import Filters from '@/components/Filters';
import { LoadingResultsTable } from '@/components/ResultsTable';
import TopMenu from '@/components/TopMenu';
import { defaultEndTime, defaultStartTime } from '@/lib/snapTime';

/**
 * Returns the loading results page with Nebula Branding, and room availability
 */
export default function Loading() {
  const searchParams = useSearchParams();

  let startTime = searchParams.get('startTime') ?? defaultStartTime + ':00';
  if (Array.isArray(startTime)) {
    startTime = startTime[0];
  }
  let endTime = searchParams.get('endTime') ?? defaultEndTime + ':00';
  if (Array.isArray(endTime)) {
    endTime = endTime[0];
  }

  return (
    <>
      <TopMenu />
      <main className="p-4 flex flex-col gap-4">
        <Filters roomsLoading />
        <LoadingResultsTable startTime={startTime} endTime={endTime} />
      </main>
    </>
  );
}
