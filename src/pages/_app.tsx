import '@/styles/globals.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GoogleAnalytics } from '@next/third-parties/google';
import { registerLicense } from '@syncfusion/ej2-base';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import useEventsStore from '@/modules/useEventsStore';
import type { AstraEvent, CourseBookEvent } from '@/types/Events';
import type { GenericFetchedData } from '@/types/GenericFetchedData';
import type { Rooms } from '@/types/Rooms';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const kallisto = localFont({
  src: [
    /*
    {
      path: '../fonts/Kallisto/Kallisto Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/Kallisto/Kallisto Thin Italic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../fonts/Kallisto/Kallisto Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Kallisto/Kallisto Light Italic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/Kallisto/Kallisto Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Kallisto/Kallisto Medium Italic.otf',
      weight: '500',
      style: 'italic',
    },
    */
    {
      path: '../fonts/Kallisto/Kallisto Bold.otf',
      weight: '700',
      style: 'normal',
    },
    /*
    {
      path: '../fonts/Kallisto/Kallisto Bold Italic.otf',
      weight: '700',
      style: 'italic',
    },
    */
    {
      path: '../fonts/Kallisto/Kallisto Heavy.otf',
      weight: '900',
      style: 'normal',
    },
    /*
    {
      path: '../fonts/Kallisto/Kallisto Heavy Italic.otf',
      weight: '900',
      style: 'italic',
    },
    */
  ],
  variable: '--font-kallisto',
});

function MyApp({ Component, pageProps }: AppProps) {
  const lightPalette = {
    palette: {
      //copied from tailwind.config.js
      primary: {
        main: '#573dff',
      },
      secondary: {
        main: '#573dff',
        light: '#c2c8ff',
      },
      error: {
        main: '#ff5743',
      },
    },
  };
  const darkPalette = {
    palette: {
      //copied from tailwind.config.js
      primary: {
        main: '#a297fd',
      },
      secondary: {
        main: '#573dff',
        light: '#c2c8ff',
      },
      error: {
        main: '#ff5743',
      },
    },
  };
  const muiTheme = createTheme({
    cssVariables: true,
    colorSchemes: {
      light: lightPalette,
      dark: darkPalette,
    },
    typography: {
      fontFamily: 'inherit',
    },
    breakpoints: {
      values: {
        //copied from tailwind.config.js
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
  });

  const [rooms, setRooms] = useState<GenericFetchedData<Rooms>>({
    state: 'loading',
  });
  useEffect(() => {
    fetch('/api/rooms')
      .then((response) => response.json())
      .then((response) => {
        if (response.message !== 'success') {
          throw new Error(response.message);
        }
        setRooms({
          state: 'done',
          data: response.data,
        });
      })
      .catch(() => {
        setRooms({ state: 'error' });
      });
  }, []);

  const [courseBookEvents, fetchAndStoreCourseBookEvents] =
    useEventsStore<CourseBookEvent>('events');

  const [astraEvents, fetchAndStoreAstraEvents] =
    useEventsStore<AstraEvent>('astra');

  if (typeof process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY !== 'undefined') {
    registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY);
  }

  return (
    <>
      <GoogleAnalytics gaId="G-BKZ9JMC28B" />
      <Head>
        <title>UTD ROOMS</title>
        <meta key="og:title" property="og:title" content="UTD ROOMS" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/logoIcon.svg" type="image/svg+xml" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ThemeProvider theme={muiTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div
            className={
              inter.variable +
              ' font-inter ' +
              kallisto.variable +
              ' h-full text-haiti dark:text-white'
            }
          >
            <Component
              rooms={rooms}
              courseBookEvents={courseBookEvents}
              fetchAndStoreCourseBookEvents={fetchAndStoreCourseBookEvents}
              astraEvents={astraEvents}
              fetchAndStoreAstraEvents={fetchAndStoreAstraEvents}
              {...pageProps}
            />
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
