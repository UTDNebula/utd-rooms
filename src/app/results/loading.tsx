'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

import Filters from '@/components/Filters';
import { LoadingResultsTable } from '@/components/ResultsTable';
import TopMenu from '@/components/TopMenu';

export default function Loading() {
  const searchParams = useSearchParams();

  let startTime = searchParams.get('startTime') ?? '09:00';
  if (Array.isArray(startTime)) {
    startTime = startTime[0];
  }
  let endTime = searchParams.get('endTime') ?? '22:00';
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
