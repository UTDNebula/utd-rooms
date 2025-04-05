import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Radio,
  Select,
} from '@mui/material';
import Button from '@mui/material/Button';
import type { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Background from '@/../public/background.png';
import buildingNames, { excludedBuildings } from '@/modules/buildingInfo';
import type { GenericFetchedData } from '@/types/GenericFetchedData';
import type { Rooms } from '@/types/Rooms';

interface Props {
  rooms: GenericFetchedData<Rooms>;
}

/**
 * Returns the home page with Nebula Branding and search options
 */
const Home: NextPage<Props> = (props: Props) => {
  const router = useRouter();

  function extractTime(dateTime: Dayjs) {
    return dateTime.format('HH:mm');
  }

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [buildings, setBuildings] = useState<string[]>([]);
  const error = Boolean(
    startTime &&
      endTime &&
      dayjs(endTime, 'HH:mm').isBefore(dayjs(startTime, 'HH:mm')),
  );

  async function searchRooms() {
    if (selectedDate !== null) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      await router.push({
        pathname: '/results',
        query: {
          date: formattedDate,
          ...(startTime && { startTime: extractTime(startTime) }),
          ...(endTime && { endTime: extractTime(endTime) }),
          ...(buildings.length && { buildings: buildings.join(',') }),
        },
      });
    }
  }

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
      <div className="relative bg-lighten dark:bg-darken h-full w-full flex flex-col justify-center items-center gap-10 px-8 py-4">
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
            Find available rooms on campus
          </p>
        </div>
        <div className="w-full max-w-96 flex flex-col items-center gap-4 sm:gap-8">
          <DatePicker
            label="Date *"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            className="w-full [&>.MuiInputBase-root]:bg-white [&>.MuiInputBase-root]:dark:bg-haiti"
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
            onChange={(newValue) => setStartTime(newValue)}
            className="w-full [&>.MuiInputBase-root]:bg-white [&>.MuiInputBase-root]:dark:bg-haiti"
            slotProps={{
              actionBar: {
                actions: ['clear', 'accept'],
              },
              textField: {
                error: error,
                helperText: error && 'Start time must be before end time',
              },
            }}
            minTime={dayjs().hour(6)}
            maxTime={dayjs().hour(23)}
          />
          <TimePicker
            label="End time"
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
            className="w-full [&>.MuiInputBase-root]:bg-white [&>.MuiInputBase-root]:dark:bg-haiti"
            slotProps={{
              actionBar: {
                actions: ['clear', 'accept'],
              },
              textField: {
                error: error,
                helperText: error && 'Start time must be before end time',
              },
            }}
            minTime={dayjs().hour(6)}
            maxTime={dayjs().hour(23)}
          />
          <FormControl className="w-full [&>.MuiInputBase-root]:bg-white [&>.MuiInputBase-root]:dark:bg-haiti">
            <InputLabel id="buildings">Buildings</InputLabel>
            <Select
              label="Buildings"
              labelId="buildings"
              multiple
              disabled={props.rooms.state !== 'done'}
              value={buildings}
              onChange={(event: SelectChangeEvent<string[]>) => {
                let newValue = event.target.value;
                if (typeof newValue === 'string') {
                  newValue = [newValue];
                }
                if (!newValue.includes('any')) {
                  setBuildings(newValue.toSorted());
                } else {
                  setBuildings([]);
                }
              }}
              renderValue={(selected) => {
                if (!selected.length) {
                  return '';
                }
                return selected.join(', ');
              }}
            >
              <MenuItem className="h-10" value="any">
                <Radio checked={!buildings.length} />
                <ListItemText primary="Any" />
              </MenuItem>
              {/* dropdown options*/}
              {props.rooms.state === 'done' &&
                Object.keys(props.rooms.data)
                  .toSorted()
                  .map((value) => {
                    if (excludedBuildings.includes(value)) {
                      return null;
                    }
                    return (
                      <MenuItem className="h-10" key={value} value={value}>
                        <Checkbox checked={buildings.includes(value)} />
                        <ListItemText
                          primary={
                            buildingNames[value as keyof typeof buildingNames]
                              ? `${buildingNames[value as keyof typeof buildingNames]} (${value})`
                              : value
                          }
                        />
                      </MenuItem>
                    );
                  })}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            className="w-fit"
            onClick={searchRooms}
            disabled={selectedDate === null}
          >
            Search Rooms
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
