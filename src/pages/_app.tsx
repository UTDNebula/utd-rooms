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
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '@/../tailwind.config.js';
import useEventsStore from '@/modules/useEventsStore';
import type { CourseBookEvent } from '@/types/Events';
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

const fullTailwindConfig = resolveConfig(tailwindConfig);

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors = fullTailwindConfig.theme.colors as any;
  const lightPalette = {
    palette: {
      //copied from tailwind.config.js
      primary: {
        main: colors.royal as string,
      },
      secondary: {
        main: colors.royal as string,
        light: colors.periwinkle as string,
      },
      error: {
        main: colors.persimmon['500'] as string,
      },
    },
  };
  const darkPalette = {
    palette: {
      //copied from tailwind.config.js
      primary: {
        main: colors.cornflower['300'] as string,
      },
      secondary: {
        main: colors.royal as string,
        light: colors.periwinkle as string,
      },
      error: {
        main: colors.persimmon['500'] as string,
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
        xs: 0,
        sm: parseInt(fullTailwindConfig.theme.screens.sm),
        md: parseInt(fullTailwindConfig.theme.screens.md),
        lg: parseInt(fullTailwindConfig.theme.screens.lg),
        xl: parseInt(fullTailwindConfig.theme.screens.xl),
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
              ' ' +
              kallisto.variable +
              ' h-full text-haiti dark:text-white'
            }
          >
            <Component
              rooms={rooms}
              courseBookEvents={courseBookEvents}
              fetchAndStoreCourseBookEvents={fetchAndStoreCourseBookEvents}
              {...pageProps}
            />
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
