import type { Metadata } from 'next';
import React from 'react';

import Home from './Home';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: 'https://rooms.utdnebula.com',
  },
};

/**
 * Returns the home page with Nebula Branding and search options
 */
export default function Page() {
  return <Home />;
}
