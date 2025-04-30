'use client';

import {
  Checkbox,
  CircularProgress,
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
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';

import Background from '@/../public/background.png';
import buildingNames, { excludedBuildings } from '@/lib/buildingInfo';
import snapTime, { defaultEndTime, defaultStartTime } from '@/lib/snapTime';
import type { Rooms } from '@/types/Rooms';

type Props =
  | {
      roomsLoading: true;
    }
  | {
      roomsLoading: false;
      rooms: Rooms;
    };

/**
 * Returns the home page with Nebula Branding and search options
 */
export default function Home(props: Props) {
  const router = useRouter();

  //for spinner after router.push
  const [isPending, startTransition] = useTransition();

  function extractTime(dateTime: Dayjs) {
    return dateTime.format('HH:mm');
  }

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
  const [buildings, setBuildings] = useState<string[]>([]);
  const error = Boolean(
    startTime &&
      endTime &&
      dayjs(endTime, 'HH:mm').isBefore(dayjs(startTime, 'HH:mm')),
  );

  function searchRooms() {
    if (date !== null) {
      const formattedDate = date.format('YYYY-MM-DD');
      startTransition(() => {
        router.push(
          '/results?' +
            new URLSearchParams({
              date: formattedDate,
              ...(startTime && { startTime: extractTime(startTime) }),
              ...(endTime && { endTime: extractTime(endTime) }),
              ...(buildings.length && { buildings: buildings.join(',') }),
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
      <div className="w-full max-w-96 flex flex-col items-center gap-4 sm:gap-8">
        <DatePicker
          label="Date *"
          value={date}
          onAccept={(newValue) => setDate(newValue)}
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
            },
          }}
        />
        <TimePicker
          label="End time"
          value={endTime}
          timeSteps={{ minutes: 15 }}
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
            },
          }}
        />
        <FormControl className="w-full [&>.MuiInputBase-root]:bg-white dark:[&>.MuiInputBase-root]:bg-haiti">
          <InputLabel id="buildings" shrink>
            Buildings
          </InputLabel>
          <Select
            label="Buildings"
            labelId="buildings"
            multiple
            disabled={props.roomsLoading}
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
                return 'Any';
              }
              return selected.join(', ');
            }}
            displayEmpty
            // loading icon on building dropdown
            MenuProps={{ PaperProps: { className: 'max-h-60' } }}
            endAdornment={
              props.roomsLoading ? <CircularProgress size={20} /> : null
            }
            IconComponent={props.roomsLoading ? () => null : undefined}
          >
            <MenuItem className="h-10" value="any">
              <Radio checked={!buildings.length} />
              <ListItemText primary="Any" />
            </MenuItem>
            {/* dropdown options*/}
            {!props.roomsLoading &&
              Object.keys(props.rooms)
                .toSorted()
                .map((value) => {
                  if (excludedBuildings.includes(value)) {
                    return null;
                  }
                  return (
                    <MenuItem className="h-10" key={value} value={value}>
                      <Checkbox checked={buildings.includes(value)} />
                      <ListItemText
                        className="text-wrap"
                        primary={
                          buildingNames[value] ? buildingNames[value] : value
                        }
                      />
                    </MenuItem>
                  );
                })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          className="h-11 relative"
          onClick={searchRooms}
          disabled={date === null || error}
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
