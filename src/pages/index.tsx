import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

/**
 * Returns the home page with Nebula Branding, ...
 */
const Home: NextPage = () => {
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
      <h1 className="text-6xl font-extrabold font-kallisto mb-6">UTD ROOMS</h1>
    </>
  );
};

export default Home;
