'use client';

import { Checkbox, CircularProgress, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState, useTransition } from 'react';

import Background from '@/../public/background.png';
import snapTime, { defaultEndTime, defaultStartTime } from '@/lib/snapTime';

/**
 * Returns the home page with Nebula Branding and search options
 */
export default function Home() {
  const router = useRouter();

  //for spinner after router.push
  const [isPending, startTransition] = useTransition();

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  // set to current hour
  const [startTime, setStartTime] = useState<Dayjs | null>(
    dayjs().hour() >= defaultStartTime && dayjs().hour() <= defaultEndTime - 2
      ? dayjs().minute(0)
      : dayjs().hour(defaultStartTime).minute(0),
  );
  // set to current hour+2
  const [endTime, setEndTime] = useState<Dayjs | null>(
    dayjs().hour() >= defaultStartTime && dayjs().hour() <= defaultEndTime - 2
      ? dayjs().add(2, 'hour').minute(0)
      : dayjs().hour(defaultEndTime).minute(0),
  );
  const error = Boolean(
    startTime &&
      endTime &&
      dayjs(endTime, 'HH:mm').isBefore(dayjs(startTime, 'HH:mm')),
  );

  // for saving the input values on change but only updating them onBlur or onKeyDown+enter
  const startTimeChange = useRef<Dayjs | null>(startTime);
  const endTimeChange = useRef<Dayjs | null>(endTime);

  const [nearby, setNearby] = useState(false);

  // only show checkbox if location is possible
  const [locationAvailable, setLocationAvailable] = useState<
    'loading' | 'yes' | 'no'
  >('loading');
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'permissions' in navigator &&
      'geolocation' in navigator
    ) {
      setLocationAvailable('yes');
    } else {
      setLocationAvailable('no');
    }
  }, []);

  const [locationGranted, setLocationGranted] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  function searchRooms() {
    if (date !== null) {
      const formattedDate = date.format('YYYY-MM-DD');
      startTransition(() => {
        router.push(
          '/results?' +
            new URLSearchParams({
              date: formattedDate,
              ...(startTime && { startTime: startTime.format('HH:mm') }),
              ...(endTime && { endTime: endTime.format('HH:mm') }),
              ...(nearby && { buildings: 'nearby' }),
            }).toString(),
        );
      });
    }
  }

  return (
    <div className="relative bg-lighten dark:bg-darken min-h-full w-full flex flex-col justify-center items-center gap-10 px-8 py-16">
      <Image
        src={Background}
        alt="gradient background"
        fill
        className="object-cover -z-20"
      />
      <div className="text-center">
        <h2 className="text-sm font-semibold mb-3 text-cornflower-600 dark:text-cornflower-400 tracking-wider">
          POWERED BY {/*eslint-disable-next-line react/jsx-no-target-blank*/}
          <a
            href="https://www.utdnebula.com/"
            target="_blank"
            rel="noopener"
            className="underline decoration-transparent hover:decoration-inherit transition"
          >
            NEBULA LABS
          </a>
        </h2>
        <h1 className="text-6xl font-extrabold font-kallisto mb-3">
          UTD ROOMS
        </h1>
        <p className="mb-5 text-gray-700 dark:text-gray-300 leading-7">
          Find available rooms at UT Dallas
        </p>
      </div>
      <div className="w-full max-w-96 flex flex-col items-center gap-4 sm:gap-4">
        <DatePicker
          label="Date *"
          value={date}
          onChange={(newValue, context) => {
            if (context.validationError == null) {
              setDate(newValue);
            }
          }}
          className="w-full [&>.MuiInputBase-root]:bg-white dark:[&>.MuiInputBase-root]:bg-haiti"
          slotProps={{
            actionBar: {
              actions: ['today', 'accept'],
            },
          }}
          disablePast
          maxDate={dayjs().add(365, 'day')}
        />
        <TimePicker
          label="Start time"
          value={startTime}
          timeSteps={{ minutes: 15 }}
          onChange={(newValue) => (startTimeChange.current = newValue)}
          onAccept={(newValue) =>
            setStartTime(newValue == null ? null : snapTime(newValue))
          }
          className="w-full [&>.MuiInputBase-root]:bg-white dark:[&>.MuiInputBase-root]:bg-haiti"
          slotProps={{
            actionBar: {
              actions: ['clear', 'accept'],
            },
            textField: {
              error: error,
              helperText: error && 'Start time must be before end time',
              onBlur: () => {
                setStartTime(
                  startTimeChange.current == null ||
                    !startTimeChange.current.isValid()
                    ? null
                    : snapTime(startTimeChange.current),
                );
              },
              onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  setStartTime(
                    startTimeChange.current == null ||
                      !startTimeChange.current.isValid()
                      ? null
                      : snapTime(startTimeChange.current),
                  );
                }
              },
            },
          }}
        />
        <TimePicker
          label="End time"
          value={endTime}
          timeSteps={{ minutes: 15 }}
          onChange={(newValue) => (endTimeChange.current = newValue)}
          onAccept={(newValue) =>
            setEndTime(newValue == null ? null : snapTime(newValue))
          }
          className="w-full [&>.MuiInputBase-root]:bg-white dark:[&>.MuiInputBase-root]:bg-haiti"
          slotProps={{
            actionBar: {
              actions: ['clear', 'accept'],
            },
            textField: {
              error: error,
              helperText: error && 'Start time must be before end time',
              onBlur: () => {
                console.log(endTimeChange.current);
                setEndTime(
                  endTimeChange.current == null ||
                    !endTimeChange.current.isValid()
                    ? null
                    : snapTime(endTimeChange.current),
                );
              },
              onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  setEndTime(
                    endTimeChange.current == null ||
                      !endTimeChange.current.isValid()
                      ? null
                      : snapTime(endTimeChange.current),
                  );
                }
              },
            },
          }}
        />
        {locationAvailable === 'loading' && (
          <FormControlLabel
            control={<Checkbox checked={false} disabled />}
            label="Nearby buildings"
          />
        )}
        {locationAvailable === 'yes' && (
          <FormControlLabel
            control={
              <Checkbox
                checked={nearby}
                icon={
                  locationLoading ? <CircularProgress size={24} /> : undefined
                }
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  //we know we can get location
                  if (!event.target.checked || locationGranted) {
                    setNearby(event.target.checked);
                  } else {
                    navigator.permissions
                      .query({ name: 'geolocation' })
                      .then((result) => {
                        if (result.state === 'granted') {
                          setLocationGranted(true);
                          setNearby(true);
                        } else if (result.state === 'prompt') {
                          setLocationLoading(true);
                          //make the prompt by getting location
                          navigator.geolocation.getCurrentPosition(
                            () => {
                              setLocationGranted(true);
                              setLocationLoading(false);
                              setNearby(true);
                            },
                            () => {
                              setLocationLoading(false);
                            },
                            {
                              enableHighAccuracy: true,
                              maximumAge: 60000, //up to one minute old
                            },
                          );
                        }
                      });
                  }
                }}
              />
            }
            label="Nearby buildings"
          />
        )}
        <Button
          variant="contained"
          className="h-11 relative"
          onClick={searchRooms}
          disabled={date === null || !date.isValid() || error}
        >
          {isPending && (
            <CircularProgress
              color="inherit"
              className="absolute left-0 right-0 m-auto h-6 w-6 text-cornflower-50 dark:text-haiti"
            />
          )}
          <span className={isPending ? 'opacity-0' : ''}>Search Rooms</span>
        </Button>
      </div>
      <p className="absolute bottom-2 text-sm text-slate-600 dark:text-slate-400">
        Originally brought to you by{' '}
        <a
          href="https://www.linkedin.com/in/mithil-viradia/"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-transparent hover:decoration-inherit transition"
        >
          Mithil Viradia
        </a>
      </p>
    </div>
  );
}
