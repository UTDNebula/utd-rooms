import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, {useEffect,useState} from 'react';
import Background from '@/../public/background.png';
import Image from 'next/image';
import Button from '@mui/material/Button';
/**
 * Returns the home page with Nebula Branding, ...
 */
const Home: NextPage = () => {
  const router = useRouter();

  function extractTime(dateTime: Dayjs){
    return dateTime.format('HH:mm');
  }
  
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  async function searchRooms() {
    if(selectedDate !== null && startTime !== null && endTime !== null) {
    const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';

    const url = `/results?date=${formattedDate}&startTime=${extractTime(startTime)}&endTime=${extractTime(endTime)}`;
    router.push(url);
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
        <h1 className="text-6xl font-extrabold font-kallisto mb-6">UTD ROOMS</h1>
      </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex justify-center mb-10">
            <DatePicker 
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}/>
          </div>
          <div className="flex justify-center mb-10">
            <TimePicker 
            label="Start time"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)} />
          </div>
          <div className="flex justify-center mb-10">
            <TimePicker 
            label="End time"
            value={endTime}
            onChange= {(newValue) => setEndTime(newValue)} />
          </div>
        </LocalizationProvider>
        <div className="flex justify-center">
        </div>
        <div className="flex justify-center mb-10">
            <Button
          variant="contained"
          type="button"
          color="primary"
          onClick={searchRooms}
          >Search Rooms</Button>
          </div>
        </div>
    </>
  );
};

export default Home;
