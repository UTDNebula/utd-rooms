import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2 as Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Radio,
  Select,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { type Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import type { GenericFetchedData } from '@/types/GenericFetchedData';
import type { Rooms } from '@/types/Rooms';

interface Props {
  rooms: GenericFetchedData<Rooms>;
}

/**
 * This component returns a set of filters with which to sort results.
 */
const Filters = (props: Props) => {
  //For updating query
  const router = useRouter();

  let date = router.query.date;
  if (Array.isArray(date)) {
    date = date[0]; // if date is an array, make it a string
  }

  let startTime = router.query.startTime;
  if (Array.isArray(startTime)) {
    startTime = startTime[0];
  }

  let endTime = router.query.endTime;
  if (Array.isArray(endTime)) {
    endTime = endTime[0];
  }

  let buildings = router.query.buildings ?? [];
  if (!Array.isArray(buildings)) {
    buildings = buildings.split(','); // if buildings is a comma-delimited string, make it an array
  }

  return (
    <Grid container spacing={2}>
      {/*Date picker*/}
      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="w-full"
            value={dayjs(date)}
            onChange={(newValue: Dayjs | null) => {
              if (router.isReady) {
                const newQuery = { ...router.query };
                if (newValue !== null) {
                  newQuery.date = newValue.toISOString().split('T')[0];
                } else {
                  //set to today
                  newQuery.date = dayjs().toISOString().split('T')[0];
                }
                router.replace(
                  {
                    query: newQuery,
                  },
                  undefined,
                  { shallow: true },
                );
              }
            }}
            slotProps={{
              actionBar: {
                actions: ['today', 'accept'],
              },
              textField: { size: 'small' },
            }}
          />
        </LocalizationProvider>
      </Grid>

      {/*Start time dropdown*/}
      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start time"
            value={startTime ? dayjs('2022-04-17T' + startTime) : null}
            onChange={(newValue: Dayjs | null) => {
              if (router.isReady) {
                const newQuery = { ...router.query };
                if (newValue !== null) {
                  newQuery.startTime = newValue.format('HH:mm');
                } else {
                  delete newQuery.startTime;
                  delete newQuery.onlyAvailFullTime;
                }
                router.replace(
                  {
                    query: newQuery,
                  },
                  undefined,
                  { shallow: true },
                );
              }
            }}
            slotProps={{
              actionBar: {
                actions: ['clear', 'accept'],
              },
              textField: { size: 'small' },
            }}
          />
        </LocalizationProvider>
      </Grid>

      {/*End time dropdown*/}
      <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="End time"
            value={endTime ? dayjs('2022-04-17T' + endTime) : null}
            onChange={(newValue: Dayjs | null) => {
              if (router.isReady) {
                const newQuery = { ...router.query };
                if (newValue !== null) {
                  newQuery.endTime = newValue.format('HH:mm');
                } else {
                  delete newQuery.endTime;
                  delete newQuery.onlyAvailFullTime;
                }
                router.replace(
                  {
                    query: newQuery,
                  },
                  undefined,
                  { shallow: true },
                );
              }
            }}
            slotProps={{
              actionBar: {
                actions: ['clear', 'accept'],
              },
              textField: { size: 'small' },
            }}
          />
        </LocalizationProvider>
      </Grid>

      {/*Building dropdown*/}
      <Grid size={{ xs: 6, sm: 6, md: 3, lg: 2.4 }}>
        <FormControl size="small" className="w-full">
          <InputLabel id="buildings">Buildings</InputLabel>
          <Select
            label="Buildings"
            labelId="buildings"
            multiple
            disabled={props.rooms.state !== 'done'}
            value={buildings}
            onChange={(event: SelectChangeEvent<string[]>) => {
              if (router.isReady) {
                const newQuery = { ...router.query };
                let newValue = event.target.value;
                if (typeof newValue === 'string') {
                  newValue = [newValue];
                }
                if (!newValue.includes('any')) {
                  newQuery.buildings = newValue.toSorted().join(',');
                } else {
                  delete newQuery.buildings;
                }
                router.replace(
                  {
                    query: newQuery,
                  },
                  undefined,
                  { shallow: true },
                );
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
                .map((value) => (
                  <MenuItem className="h-10" key={value} value={value}>
                    <Checkbox checked={buildings.includes(value)} />
                    <ListItemText primary={value} />
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
      </Grid>

      {/*Only show rooms available the whole time checkbox*/}
      <Grid size={{ xs: 12, sm: 6, md: 12, lg: 2.4 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={router.query.onlyAvailFullTime === 'true'}
              disabled={!startTime || !endTime}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (router.isReady) {
                  const newQuery = { ...router.query };
                  if (event.target.checked) {
                    newQuery.onlyAvailFullTime = 'true';
                  } else {
                    delete newQuery.onlyAvailFullTime;
                  }
                  router.replace(
                    {
                      query: newQuery,
                    },
                    undefined,
                    { shallow: true },
                  );
                }
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
