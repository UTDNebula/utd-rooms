import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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
      <style jsx global>{`
        body {
          background-image: url('/background.png');
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
      `}</style>
      <div className="text-center text-white" style={{ marginTop: '10vh' }}>
        <h1 className="text-6xl font-extrabold font-kallisto mb-6">UTD ROOMS</h1>
      </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex justify-center mb-10">
            <DatePicker />
          </div>
          <div className="flex justify-center mb-10">
            <TimePicker label="Start time" />
          </div>
          <div className="flex justify-center mb-10">
            <TimePicker label="End time" />
          </div>
        </LocalizationProvider>
        <div className="flex justify-center">
        </div>
    </>
  );
};

export default Home;
