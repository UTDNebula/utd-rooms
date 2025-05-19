import React from 'react';

import { LoadingFilters } from '@/components/Filters';
import { LoadingResultsTable } from '@/components/ResultsTable';
import TopMenu from '@/components/TopMenu';
import { defaultEndTime, defaultStartTime } from '@/lib/snapTime';

/**
 * Returns the loading results page with Nebula Branding, and room availability
 */
export default function Loading() {
  return (
    <>
      <TopMenu />
      <main className="p-4 flex flex-col gap-4">
        <LoadingFilters />
        <LoadingResultsTable
          startTime={defaultStartTime + ':00'}
          endTime={defaultEndTime + ':00'}
        />
      </main>
    </>
  );
}
