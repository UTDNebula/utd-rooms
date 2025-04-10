import '@/styles/globals.css';

import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import React from 'react';

import ClientLocalizationProvider from '@/lib/localization';
import SyncfusionWrapper from '@/lib/syncfusion';
import theme from '@/lib/theme';

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

export const metadata: Metadata = {
  metadataBase: new URL('https://rooms.utdnebula.com'),
  title: 'UTD ROOMS',
  description: 'Find open rooms at UT Dallas.',
  openGraph: {
    title: 'UTD ROOMS',
    description: 'Find open rooms at UT Dallas.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
};

export const viewport = {
  //copied from tailwind.config.js
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#a297fd' },
    { media: '(prefers-color-scheme: dark)', color: '#a297fd' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-BKZ9JMC28B" />
      <body className="bg-white dark:bg-black">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ClientLocalizationProvider>
              <SyncfusionWrapper>
                <div
                  className={
                    inter.variable +
                    ' font-inter ' +
                    kallisto.variable +
                    ' h-full text-haiti dark:text-white'
                  }
                >
                  {children}
                </div>
              </SyncfusionWrapper>
            </ClientLocalizationProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
