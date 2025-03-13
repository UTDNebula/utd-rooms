import {
  Autocomplete,
  Checkbox,
  FormControl,
  Grid2 as Grid,
  ListItemText,
  MenuItem,
  Radio,
  Select,
  TextField,
  InputLabel,
} from '@mui/material';

import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { excludedBuildingsAndRooms } from '@/modules/buildingInfo';
import type { SelectChangeEvent } from '@mui/material/Select';
import Background from '@/../public/background.png';
import type { GenericFetchedData } from '@/types/GenericFetchedData';
import type { Rooms } from '@/types/Rooms';

interface Props {
  rooms: GenericFetchedData<Rooms>;
}

/**
 * Returns the home page with Nebula Branding and search options
 */
const Home: NextPage<Props> = (props: Props) => {
  console.log(props.rooms);
  const router = useRouter();

  function extractTime(dateTime: Dayjs) {
    return dateTime.format('HH:mm');
  }

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [buildings, setBuildings] = useState<String[]>([]);

  async function searchRooms() {
    if (selectedDate !== null) {
      const formattedDate = selectedDate
        ? selectedDate.toISOString().split('T')[0]
        : '';

      const params = { date: formattedDate };
      if (startTime) {
        params.startTime = extractTime(startTime);
      }
      if (endTime) {
        params.endTime = extractTime(endTime);
      }
      if (buildings.length) {
        params.buildings = buildings.join(',');
      }

      router.push({
        pathname: '/results',
        query: params,
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
      <div className="relative bg-lighten dark:bg-darken h-full w-full flex flex-col items-center gap-4 px-8 py-4">
        <Image
          src={Background}
          alt="gradient background"
          fill
          className="object-cover -z-20"
        />
        <div className="text-center text-white" style={{ marginTop: '10vh' }}>
          <h1 className="text-6xl font-extrabold font-kallisto mb-6">
            UTD ROOMS
          </h1>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 mb-10">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              className="flex justify-center mb-10 w-full [&>.MuiInputBase-root]:bg-white [&>.MuiInputBase-root]:dark:bg-black"
              // sx={{ backgroundColor: 'black' }}
            />
            <TimePicker
              label="Start time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              className="flex justify-center mb-10 w-full [&>.MuiInputBase-root]:bg-white [&>.MuiInputBase-root]:dark:bg-black"
            />
            <TimePicker
              label="End time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              className="flex justify-center mb-10 w-full [&>.MuiInputBase-root]:bg-white [&>.MuiInputBase-root]:dark:bg-black"
            />
            <FormControl className="w-full [&>.MuiInputBase-root]:bg-white [&>.MuiInputBase-root]:dark:bg-black">
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
                      if (excludedBuildingsAndRooms.includes(value)) {
                        return null;
                      }
                      return (
                        <MenuItem className="h-10" key={value} value={value}>
                          <Checkbox checked={buildings.includes(value)} />
                          <ListItemText primary={value} />
                        </MenuItem>
                      );
                    })}
              </Select>
            </FormControl>
          </LocalizationProvider>
        </div>
        <div className="flex justify-center mb-10">
          <Button
            variant="contained"
            type="button"
            color="primary"
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
