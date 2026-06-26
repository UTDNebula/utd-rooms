import { LoadingFilters } from '@/components/Filters';
import Footer from '@/components/Footer';
import { LoadingResultsTable } from '@/components/ResultsTable';
import TopMenu from '@/components/TopMenu';
import { defaultEndTime, defaultStartTime } from '@/lib/timeUtils';

/**
 * Returns the loading results page with Nebula Branding, and room availability
 */
export default function Loading() {
  return (
    <>
      <TopMenu />
      <main className="p-4 flex flex-col gap-4 min-h-screen">
        <LoadingFilters />
        <LoadingResultsTable
          startTime={defaultStartTime + ':00'}
          endTime={defaultEndTime + ':00'}
        />
      </main>
      <Footer />
    </>
  );
}
