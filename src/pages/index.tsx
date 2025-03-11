import {
  Autocomplete,
  //Checkbox,
  //FormControl,
  //Grid2 as Grid,
  //ListItemText,
  //MenuItem,
  //Radio,
  //Select,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

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

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  async function searchRooms() {
    if (selectedDate !== null && startTime !== null && endTime !== null) {
      const formattedDate = selectedDate
        ? selectedDate.toISOString().split('T')[0]
        : '';

      const url = `/results?date=${formattedDate}&startTime=${extractTime(startTime)}&endTime=${extractTime(endTime)}`;
      router.push(url);
    }
  }

  let buildings = router.query.buildings ?? [];
  if (!Array.isArray(buildings)) {
    buildings = buildings.split(','); // if buildings is a comma-delimited string, make it an array
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex justify-center mb-10">
            <DatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </div>
          <div className="flex justify-center mb-10">
            <TimePicker
              label="Start time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
            />
          </div>
          <div className="flex justify-center mb-10">
            <TimePicker
              label="End time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
            />
          </div>
          <div className="flex justify-center mb-10">
            <Autocomplete
              multiple
              id="tags-outlined"
              options={buildings}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Buildings" fullWidth />
              )}
              fullWidth
            />
          </div>
        </LocalizationProvider>
        <div className="flex justify-center mb-10">
          <Button
            variant="contained"
            type="button"
            color="primary"
            onClick={searchRooms}
          >
            Search Rooms
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
