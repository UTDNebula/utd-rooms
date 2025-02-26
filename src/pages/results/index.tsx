import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import TopMenu from '@/components/topMenu';

/**
 * Returns the results page with Nebula Branding, and room availability
 */
const Home: NextPage = () => {
  //Fetch data here

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

export default Home;
