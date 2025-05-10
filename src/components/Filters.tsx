'use client';

import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Radio,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { type Dayjs } from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import buildingNames, { excludedBuildings } from '@/lib/buildingInfo';
import snapTime from '@/lib/snapTime';
import type { Rooms } from '@/types/Rooms';

export function LoadingFilters() {
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <DatePicker
          label="Date *"
          className="w-full"
          disabled
          slotProps={{
            textField: {
              size: 'small',
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <TimePicker
          timeSteps={{ minutes: 15 }}
          label="Start time"
          className="w-full"
          disabled
          slotProps={{
            textField: {
              size: 'small',
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <TimePicker
          timeSteps={{ minutes: 15 }}
          label="End time"
          className="w-full"
          disabled
          slotProps={{
            textField: {
              size: 'small',
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <FormControl size="small" className="w-full">
          <InputLabel id="buildings">Buildings</InputLabel>
          <Select
            label="Buildings"
            labelId="buildings"
            disabled
            value=""
            endAdornment={<CircularProgress size={20} />}
            IconComponent={() => null}
          ></Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <TextField
          label="Min Capacity"
          size="small"
          className="w-full"
          disabled
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 4, lg: 2 }} className="px-2">
        <Tooltip title="Only show rooms available the whole time">
          <FormControlLabel
            control={<Checkbox disabled />}
            label="Full availability"
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
}

interface Props {
  date: string;
  startTime: string | null;
  endTime: string | null;
  minCapacity: string | null;
  buildings: string[];
  fullAvailability: boolean;
  rooms: Rooms;
}

/**
 * This component returns a set of filters with which to sort results.
 */
export default function Filters(props: Props) {
  //For updating query
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const date = props.date;
  const dayjsDate = dayjs(date);

  const startTime = props.startTime;
  const endTime = props.endTime;
  const error = Boolean(
    startTime &&
      endTime &&
      dayjs(endTime, 'HH:mm').isBefore(dayjs(startTime, 'HH:mm')),
  );

  const minCapacity = props.minCapacity;

  const buildings = props.buildings;

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

  const fullAvailability = props.fullAvailability;

  // for saving the input values on change but only updating them onBlur or onKeyDown+enter
  const dateChange = useRef<Dayjs | null>(dayjsDate);
  const startTimeChange = useRef<Dayjs | null>(
    dayjs(date + startTime, 'YYYY-MM-DDHH:mm'),
  );
  const endTimeChange = useRef<Dayjs | null>(
    dayjs(date + endTime, 'YYYY-MM-DDHH:mm'),
  );
  const [minCapacityChange, setMinCapacityChange] = useState(minCapacity ?? '');

  function setDate(newValue: Dayjs | null) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(
      'date',
      newValue?.format('YYYY-MM-DD') ?? dayjs().format('YYYY-MM-DD'),
    );
    router.replace(`${pathname}?${params.toString()}`);
  }

  function setStartTime(newValue: Dayjs | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (newValue) {
      params.set('startTime', snapTime(newValue).format('HH:mm'));
    } else {
      params.delete('startTime');
      params.delete('fullAvailability');
    }
    window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
  }

  function setEndTime(newValue: Dayjs | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (newValue) {
      params.set('endTime', snapTime(newValue).format('HH:mm'));
    } else {
      params.delete('endTime');
      params.delete('fullAvailability');
    }
    window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
  }

  function setMinCapacity(newValue: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (newValue !== '') {
      params.set('minCapacity', newValue);
    } else {
      params.delete('minCapacity');
    }
    window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
  }

  return (
    <Grid container spacing={1}>
      {/*Date picker*/}
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <DatePicker
          label="Date *"
          className="w-full"
          value={dayjsDate}
          onChange={(newValue) => (dateChange.current = newValue)}
          onAccept={setDate}
          slotProps={{
            actionBar: {
              actions: ['today', 'accept'],
            },
            textField: {
              size: 'small',
              onBlur: () => {
                if (
                  dateChange.current != null &&
                  dateChange.current.isValid() &&
                  !dayjsDate.isSame(dateChange.current, 'day')
                ) {
                  setDate(dateChange.current);
                }
              },
              onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  if (
                    dateChange.current != null &&
                    dateChange.current.isValid() &&
                    !dayjsDate.isSame(dateChange.current, 'day')
                  ) {
                    setDate(dateChange.current);
                  }
                }
              },
            },
          }}
          disablePast
          maxDate={dayjs().add(365, 'day')}
        />
      </Grid>

      {/*Start time dropdown*/}
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <TimePicker
          timeSteps={{ minutes: 15 }}
          label="Start time"
          className="w-full"
          value={startTime ? dayjs(startTime, 'HH:mm') : null}
          onChange={(newValue) => (startTimeChange.current = newValue)}
          onAccept={setStartTime}
          slotProps={{
            actionBar: {
              actions: ['clear', 'accept'],
            },
            textField: {
              size: 'small',
              error: error,
              helperText: error && 'Start time must be before end time',
              onBlur: () => {
                setStartTime(
                  startTimeChange.current == null ||
                    !startTimeChange.current.isValid()
                    ? null
                    : startTimeChange.current,
                );
              },
              onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  setStartTime(
                    startTimeChange.current == null ||
                      !startTimeChange.current.isValid()
                      ? null
                      : startTimeChange.current,
                  );
                }
              },
            },
          }}
        />
      </Grid>

      {/*End time dropdown*/}
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <TimePicker
          timeSteps={{ minutes: 15 }}
          label="End time"
          className="w-full"
          value={endTime ? dayjs(endTime, 'HH:mm') : null}
          onChange={(newValue) => (endTimeChange.current = newValue)}
          onAccept={setEndTime}
          slotProps={{
            actionBar: {
              actions: ['clear', 'accept'],
            },
            textField: {
              size: 'small',
              error: error,
              helperText: error && 'Start time must be before end time',
              onBlur: () => {
                setEndTime(
                  endTimeChange.current == null ||
                    !endTimeChange.current.isValid()
                    ? null
                    : endTimeChange.current,
                );
              },
              onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  setEndTime(
                    endTimeChange.current == null ||
                      !endTimeChange.current.isValid()
                      ? null
                      : endTimeChange.current,
                  );
                }
              },
            },
          }}
        />
      </Grid>

      {/*Building dropdown*/}
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <FormControl size="small" className="w-full">
          <InputLabel id="buildings" shrink>
            Buildings
          </InputLabel>
          <Select
            label="Buildings"
            labelId="buildings"
            multiple
            value={buildings}
            onChange={(event: SelectChangeEvent<string[]>) => {
              const newValue = Array.isArray(event.target.value)
                ? event.target.value
                : [event.target.value];
              const params = new URLSearchParams(searchParams.toString());
              let replaceAtEnd = true;
              function replaceState() {
                window.history.replaceState(
                  null,
                  '',
                  `${pathname}?${params.toString()}`,
                );
              }
              if (newValue.includes('any')) {
                params.delete('buildings');
              } else if (
                newValue.includes('nearby') &&
                //not already there
                buildings[0] !== 'nearby'
              ) {
                //we know we can get location
                if (locationGranted) {
                  params.set('buildings', 'nearby');
                } else {
                  //don't run window.history.replaceState at the end, run it in these callbacks
                  replaceAtEnd = false;
                  navigator.permissions
                    .query({ name: 'geolocation' })
                    .then((result) => {
                      if (result.state === 'granted') {
                        setLocationGranted(true);
                        params.set('buildings', 'nearby');
                        replaceState();
                      } else if (result.state === 'prompt') {
                        setLocationLoading(true);
                        //make the prompt by getting location
                        navigator.geolocation.getCurrentPosition(
                          () => {
                            setLocationGranted(true);
                            setLocationLoading(false);
                            params.set('buildings', 'nearby');
                            replaceState();
                          },
                          () => {
                            setLocationLoading(false);
                            params.delete('buildings');
                            replaceState();
                          },
                          {
                            maximumAge: 60000, //up to one minute old
                          },
                        );
                      }
                    });
                }
              } else {
                params.set(
                  'buildings',
                  newValue
                    .filter((building) => building !== 'nearby')
                    .sort()
                    .join(','),
                );
              }
              if (replaceAtEnd) {
                replaceState();
              }
            }}
            renderValue={(selected) => {
              if (!selected.length) {
                return 'Any';
              }
              if (selected[0] === 'nearby') {
                return 'Nearby';
              }
              return selected.join(', ');
            }}
            displayEmpty
            // loading icon on building dropdown
            endAdornment={
              locationLoading ? <CircularProgress size={20} /> : null
            }
            IconComponent={locationLoading ? () => null : undefined}
            MenuProps={{ PaperProps: { className: 'max-h-60' } }}
          >
            <MenuItem className="h-10" value="any">
              <Radio checked={!buildings.length} />
              <ListItemText primary="Any" />
            </MenuItem>
            {locationAvailable === 'loading' && (
              <MenuItem className="h-10" value="nearby">
                <Radio disabled />
                <ListItemText primary="Nearby" />
              </MenuItem>
            )}
            {locationAvailable === 'yes' && (
              <MenuItem className="h-10" value="nearby">
                <Radio checked={buildings[0] === 'nearby'} />
                <ListItemText primary="Nearby" />
              </MenuItem>
            )}
            {/* dropdown options*/}
            {Object.keys(props.rooms)
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
      </Grid>

      {/*Capacity input*/}
      <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
        <TextField
          label="Min Capacity"
          size="small"
          className="w-full"
          value={minCapacityChange}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setMinCapacityChange(event.target.value)
          }
          onBlur={() => {
            setMinCapacity(minCapacityChange);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setMinCapacity(minCapacityChange);
            }
          }}
        />
      </Grid>

      {/*Only show rooms available the whole time checkbox*/}
      <Grid size={{ xs: 6, sm: 4, lg: 2 }} className="px-2">
        <Tooltip title="Only show rooms available the whole time">
          <FormControlLabel
            control={
              <Checkbox
                checked={fullAvailability}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const params = new URLSearchParams(searchParams.toString());
                  if (event.target.checked) {
                    params.set('fullAvailability', 'true');
                  } else {
                    params.delete('fullAvailability');
                  }
                  window.history.replaceState(
                    null,
                    '',
                    `${pathname}?${params.toString()}`,
                  );
                }}
              />
            }
            label="Full availability"
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
}
