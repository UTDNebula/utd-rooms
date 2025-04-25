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
import React from 'react';

import buildingNames, { excludedBuildings } from '@/lib/buildingInfo';
import snapTime from '@/lib/snapTime';
import type { Rooms } from '@/types/Rooms';

type Props =
  | {
      roomsLoading: true;
    }
  | {
      roomsLoading: false;
      date: string;
      startTime: string | null;
      endTime: string | null;
      minCapacity: string | null;
      buildings: string[];
      fullAvailability: boolean;
      rooms: Rooms;
    };

/**
 * This component returns a set of filters with which to sort results.
 */
export default function Filters(props: Props) {
  //For updating query
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const date = !props.roomsLoading ? props.date : undefined;

  const startTime = !props.roomsLoading ? props.startTime : null;
  const endTime = !props.roomsLoading ? props.endTime : null;
  const error = Boolean(
    startTime &&
      endTime &&
      dayjs(endTime, 'HH:mm').isBefore(dayjs(startTime, 'HH:mm')),
  );

  const minCapacity = !props.roomsLoading ? props.minCapacity : '';

  const buildings = !props.roomsLoading ? props.buildings : [];

  const fullAvailability = !props.roomsLoading ? props.fullAvailability : false;

  return (
    <Grid container spacing={1}>
      {/*Date picker*/}
      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
        <DatePicker
          className="w-full"
          value={dayjs(date)}
          onAccept={(newValue: Dayjs | null) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(
              'date',
              newValue?.format('YYYY-MM-DD') ?? dayjs().format('YYYY-MM-DD'),
            );
            router.replace(`${pathname}?${params.toString()}`);
          }}
          slotProps={{
            actionBar: {
              actions: ['today', 'accept'],
            },
            textField: { size: 'small' },
          }}
          disablePast
          maxDate={dayjs().add(365, 'day')}
        />
      </Grid>

      {/*Start time dropdown*/}
      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
        <TimePicker
          timeSteps={{ minutes: 15 }}
          label="Start time"
          className="w-full"
          value={startTime ? dayjs(startTime, 'HH:mm') : null}
          onAccept={(newValue: Dayjs | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (newValue) {
              params.set('startTime', snapTime(newValue).format('HH:mm'));
            } else {
              params.delete('startTime');
              params.delete('fullAvailability');
            }
            window.history.replaceState(
              null,
              '',
              `${pathname}?${params.toString()}`,
            );
          }}
          slotProps={{
            actionBar: {
              actions: ['clear', 'accept'],
            },
            textField: {
              size: 'small',
              error: error,
              helperText: error && 'Start time must be before end time',
            },
          }}
        />
      </Grid>

      {/*End time dropdown*/}
      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
        <TimePicker
          timeSteps={{ minutes: 15 }}
          label="End time"
          className="w-full"
          value={endTime ? dayjs(endTime, 'HH:mm') : null}
          onAccept={(newValue: Dayjs | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (newValue) {
              params.set('endTime', snapTime(newValue).format('HH:mm'));
            } else {
              params.delete('endTime');
              params.delete('fullAvailability');
            }
            window.history.replaceState(
              null,
              '',
              `${pathname}?${params.toString()}`,
            );
          }}
          slotProps={{
            actionBar: {
              actions: ['clear', 'accept'],
            },
            textField: {
              size: 'small',
              error: error,
              helperText: error && 'Start time must be before end time',
            },
          }}
        />
      </Grid>

      {/*Building dropdown*/}
      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
        <FormControl size="small" className="w-full">
          <InputLabel id="buildings">Buildings</InputLabel>
          <Select
            label="Buildings"
            labelId="buildings"
            multiple
            disabled={props.roomsLoading}
            value={buildings}
            onChange={(event: SelectChangeEvent<string[]>) => {
              const newValue = Array.isArray(event.target.value)
                ? event.target.value
                : [event.target.value];
              const params = new URLSearchParams(searchParams.toString());
              if (newValue.includes('any')) {
                params.delete('buildings');
              } else {
                params.set('buildings', newValue.sort().join(','));
              }
              window.history.replaceState(
                null,
                '',
                `${pathname}?${params.toString()}`,
              );
            }}
            renderValue={(selected) => {
              if (!selected.length) {
                return '';
              }
              return selected.join(', ');
            }}
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
      </Grid>

      {/*Capacity input*/}
      <Grid size={{ xs: 6, sm: 4, md: 6, lg: 2 }}>
        <TextField
          label="Min Capacity"
          size="small"
          className="w-full"
          value={minCapacity}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const params = new URLSearchParams(searchParams.toString());
            if (event.target.value !== '') {
              params.set('minCapacity', event.target.value);
            } else {
              params.delete('minCapacity');
            }
            window.history.replaceState(
              null,
              '',
              `${pathname}?${params.toString()}`,
            );
          }}
        />
      </Grid>

      {/*Only show rooms available the whole time checkbox*/}
      <Grid size={{ xs: 6, sm: 4, md: 6, lg: 2 }} className="px-2">
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
