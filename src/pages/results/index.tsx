import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Filters from '@/components/Filters';
import ResultsTable from '@/components/ResultsTable';
import TopMenu from '@/components/TopMenu';
import type { HierarchyStore } from '@/modules/useEventsStore';
import type { CourseBookEvent } from '@/types/Events';
import type { GenericFetchedData } from '@/types/GenericFetchedData';
import type { Rooms } from '@/types/Rooms';

interface Props {
  rooms: GenericFetchedData<Rooms>;
  courseBookEvents: HierarchyStore<CourseBookEvent>;
  fetchAndStoreCourseBookEvents: (
    date: string,
    controller: AbortController,
  ) => void;
}

/**
 * Returns the results page with Nebula Branding, and room availability
 */
const Results: NextPage<Props> = (props: Props) => {
  //Fetch data from query
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      //To cancel on rerender
      const controller = new AbortController();

      //Parse date
      let date = router.query.date;
      if (typeof date === 'undefined') {
        const newQuery = { ...router.query };
        //set to today
        newQuery.date = new Date().toISOString().split('T')[0];
        date = newQuery.date;
        router.replace(
          {
            query: newQuery,
          },
          undefined,
          { shallow: true },
        );
      }
      if (Array.isArray(date)) {
        date = date[0];
      }

      //Fetch data
      props.fetchAndStoreCourseBookEvents(date, controller);

      //Run to cancel
      return () => {
        controller.abort();
      };
    }
  }, [router.isReady, router.query.date]);

  const [search, setSearch] = useState('');

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://rooms.utdnebula.com"
          key="canonical"
        />
        <meta property="og:url" content="https://rooms.utdnebula.com" />
      </Head>
      <div className="w-full h-full">
        <TopMenu search={search} setSearch={setSearch} />
        <main className="p-4 flex flex-col gap-4">
          <Filters rooms={props.rooms} />
          <ResultsTable
            rooms={props.rooms}
            courseBookEvents={props.courseBookEvents}
            search={search}
          />
        </main>
      </div>
    </>
  );
};

export default Results;
