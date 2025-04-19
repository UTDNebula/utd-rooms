import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

import fetchEvents from '@/lib/fetchEvents';
import fetchRooms from '@/lib/fetchRooms';
import type { AstraEvent, CourseBookEvent, MazevoEvent } from '@/types/Events';

import Results from './Results';

export const metadata: Metadata = {
  alternates: {
    canonical: '/results',
  },
  openGraph: {
    url: 'https://rooms.utdnebula.com/results',
  },
};

/**
 * Returns the results page with Nebula Branding, and room availability
 */
export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  let date = searchParams.date;
  if (typeof date === 'undefined') {
    const params = new URLSearchParams(
      Object.entries(searchParams)
        .filter(([, value]) => typeof value === 'string')
        .map(([key, value]) => [key, value as string]),
    );
    params.set('date', new Date().toISOString().split('T')[0]);
    redirect('/results?' + params.toString());
  }
  if (Array.isArray(date)) {
    date = date[0];
  }

  const [rooms, courseBookEvents, astraEvents, mazevoEvents] =
    await Promise.all([
      fetchRooms(),
      fetchEvents<CourseBookEvent>('events', date),
      fetchEvents<AstraEvent>('astra', date),
      fetchEvents<MazevoEvent>('mazevo', date),
    ]);
  return (
    <Results
      date={date}
      rooms={rooms.message === 'success' ? rooms.data : {}}
      courseBookEvents={
        courseBookEvents.message === 'success' ? courseBookEvents.data : {}
      }
      astraEvents={astraEvents.message === 'success' ? astraEvents.data : {}}
      mazevoEvents={mazevoEvents.message === 'success' ? mazevoEvents.data : {}}
    />
  );
}
