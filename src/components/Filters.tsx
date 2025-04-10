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
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { type Dayjs } from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import buildingNames, { excludedBuildings } from '@/modules/buildingInfo';
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
      buildings: string[];
      onlyAvailFullTime: boolean;
      rooms: Rooms;
    };

/**
 * This component returns a set of filters with which to sort results.
 */
const Filters = (props: Props) => {
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

  const buildings = !props.roomsLoading ? props.buildings : [];

  const onlyAvailFullTime = !props.roomsLoading
    ? props.onlyAvailFullTime
    : false;

  return (
    <Grid container spacing={1}>
      {/*Date picker*/}
      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
        <DatePicker
          className="w-full"
          value={dayjs(date)}
          onChange={(newValue: Dayjs | null) => {
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
      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
        <TimePicker
          label="Start time"
          className="w-full"
          value={startTime ? dayjs(startTime, 'HH:mm') : null}
          onChange={(newValue: Dayjs | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (newValue) {
              params.set('startTime', newValue.format('HH:mm'));
            } else {
              params.delete('startTime');
              params.delete('onlyAvailFullTime');
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
          minTime={dayjs().hour(6)}
          maxTime={dayjs().hour(23)}
        />
      </Grid>

      {/*End time dropdown*/}
      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
        <TimePicker
          label="End time"
          className="w-full"
          value={endTime ? dayjs(endTime, 'HH:mm') : null}
          onChange={(newValue: Dayjs | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (newValue) {
              params.set('endTime', newValue.format('HH:mm'));
            } else {
              params.delete('endTime');
              params.delete('onlyAvailFullTime');
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
          minTime={dayjs().hour(6)}
          maxTime={dayjs().hour(23)}
        />
      </Grid>

      {/*Building dropdown*/}
      <Grid size={{ xs: 6, sm: 6, md: 3, lg: 2.4 }}>
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
                          buildingNames[value]
                            ? `${value} (${buildingNames[value]})`
                            : value
                        }
                      />
                    </MenuItem>
                  );
                })}
          </Select>
        </FormControl>
      </Grid>

      {/*Only show rooms available the whole time checkbox*/}
      <Grid size={{ xs: 12, sm: 6, md: 12, lg: 2.4 }} className="px-2">
        <FormControlLabel
          control={
            <Checkbox
              checked={onlyAvailFullTime}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const params = new URLSearchParams(searchParams.toString());
                if (event.target.checked) {
                  params.set('onlyAvailFullTime', 'true');
                } else {
                  params.delete('onlyAvailFullTime');
                }
                window.history.replaceState(
                  null,
                  '',
                  `${pathname}?${params.toString()}`,
                );
              }}
            />
          }
          label="Only show rooms available the whole time"
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
