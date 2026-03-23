import fetchEvents from '@/lib/fetchEvents';
import fetchRooms from '@/lib/fetchRooms';
import type {
  AstraEvent,
  CometCalendarEvent,
  CourseBookEvent,
  MazevoEvent,
} from '@/types/Events';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
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

  const [
    rooms,
    courseBookEvents,
    astraEvents,
    mazevoEvents,
    cometCalendarEvents,
  ] = await Promise.all([
    fetchRooms(),
    fetchEvents<CourseBookEvent>('events', date),
    fetchEvents<AstraEvent>('astra', date),
    fetchEvents<MazevoEvent>('mazevo', date),
    fetchEvents<CometCalendarEvent>('calendar', date),
  ]);
  return (
    <Results
      date={date}
      rooms={rooms}
      courseBookEvents={courseBookEvents}
      astraEvents={astraEvents}
      mazevoEvents={mazevoEvents}
      cometCalendarEvents={cometCalendarEvents}
    />
  );
}
