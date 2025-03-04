import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import TopMenu from '@/components/topMenu';
import type { GenericFetchedData } from '@/types/GenericFetchedData';
import type { Rooms } from '@/types/Rooms';

interface Props {
  rooms: GenericFetchedData<Rooms>;
}

/**
 * Returns the results page with Nebula Branding, and room availability
 */
const Results: NextPage<Props> = (props: Props) => {
  console.log(props.rooms);

  // Read search query params and fetch events data

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
        <TopMenu />
        <main className="p-4">
          {/*Add filters component*/}
          {/*Add results component*/}
        </main>
      </div>
    </>
  );
};

export default Results;
