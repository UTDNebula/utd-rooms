import { Skeleton } from '@mui/material';
import {
  Inject,
  ResourceDirective,
  ResourcesDirective,
  ScheduleComponent,
  TimelineViews,
  ViewDirective,
  ViewsDirective,
} from '@syncfusion/ej2-react-schedule';
import dayjs, { type Dayjs } from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { excludedBuildings } from '@/modules/buildingInfo';
import type { HierarchyStore } from '@/modules/useEventsStore';
import type { CourseBookEvent } from '@/types/Events';
import type { GenericFetchedData } from '@/types/GenericFetchedData';
import type { Rooms } from '@/types/Rooms';

interface BuildingResource {
  type: 'building';
  id: number;
  text: string;
}
interface RoomResource {
  type: 'room';
  id: number;
  text: string;
  link: string;
  buildingId: number;
}
interface EventSource {
  id: string;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  roomId: number;
  buildingId: number;
}

interface LoadingProps {
  startTime: string;
  endTime: string;
}

function LoadingResultsTable(props: LoadingProps) {
  const buildingResources = [
    {
      type: 'building',
      id: 1,
      text: 'AB',
    },
    {
      type: 'building',
      id: 2,
      text: 'AD',
    },
  ];
  const roomResources = [
    {
      type: 'room',
      id: 1,
      text: '1.138',
      link: '',
      buildingId: 1,
    },
    {
      type: 'room',
      id: 2,
      text: '2.216',
      link: '',
      buildingId: 2,
    },
    {
      type: 'room',
      id: 3,
      text: '2.232',
      link: '',
      buildingId: 2,
    },
    {
      type: 'room',
      id: 4,
      text: '2.238',
      link: '',
      buildingId: 2,
    },
    {
      type: 'room',
      id: 5,
      text: '3.214',
      link: '',
      buildingId: 2,
    },
    {
      type: 'room',
      id: 6,
      text: '3.216',
      link: '',
      buildingId: 2,
    },
    {
      type: 'room',
      id: 7,
      text: '2.216',
      link: '',
      buildingId: 2,
    },
    {
      type: 'room',
      id: 8,
      text: '2.218',
      link: '',
      buildingId: 2,
    },
  ];
  const scheduleData: EventSource[] = [
    {
      id: '1',
      Subject: 'Class',
      StartTime: dayjs('08:30', 'HH:mm').toDate(),
      EndTime: dayjs('09:45', 'HH:mm').toDate(),
      roomId: 1,
      buildingId: 1,
    },
    {
      id: '2',
      Subject: 'Class',
      StartTime: dayjs('11:30', 'HH:mm').toDate(),
      EndTime: dayjs('12:45', 'HH:mm').toDate(),
      roomId: 1,
      buildingId: 1,
    },
    {
      id: '3',
      Subject: 'Class',
      StartTime: dayjs('13:00', 'HH:mm').toDate(),
      EndTime: dayjs('14:15', 'HH:mm').toDate(),
      roomId: 1,
      buildingId: 1,
    },
    {
      id: '4',
      Subject: 'Class',
      StartTime: dayjs('16:00', 'HH:mm').toDate(),
      EndTime: dayjs('17:15', 'HH:mm').toDate(),
      roomId: 1,
      buildingId: 1,
    },
    {
      id: '5',
      Subject: 'Class',
      StartTime: dayjs('10:00', 'HH:mm').toDate(),
      EndTime: dayjs('11:15', 'HH:mm').toDate(),
      roomId: 2,
      buildingId: 2,
    },
    {
      id: '6',
      Subject: 'Class',
      StartTime: dayjs('11:30', 'HH:mm').toDate(),
      EndTime: dayjs('12:45', 'HH:mm').toDate(),
      roomId: 2,
      buildingId: 2,
    },
    {
      id: '7',
      Subject: 'Class',
      StartTime: dayjs('19:00', 'HH:mm').toDate(),
      EndTime: dayjs('21:45', 'HH:mm').toDate(),
      roomId: 2,
      buildingId: 2,
    },
    {
      id: '8',
      Subject: 'Class',
      StartTime: dayjs('13:00', 'HH:mm').toDate(),
      EndTime: dayjs('14:15', 'HH:mm').toDate(),
      roomId: 3,
      buildingId: 2,
    },
    {
      id: '9',
      Subject: 'Class',
      StartTime: dayjs('17:30', 'HH:mm').toDate(),
      EndTime: dayjs('18:45', 'HH:mm').toDate(),
      roomId: 3,
      buildingId: 2,
    },
    {
      id: '10',
      Subject: 'Class',
      StartTime: dayjs('08:30', 'HH:mm').toDate(),
      EndTime: dayjs('9:45', 'HH:mm').toDate(),
      roomId: 4,
      buildingId: 2,
    },
    {
      id: '11',
      Subject: 'Class',
      StartTime: dayjs('13:00', 'HH:mm').toDate(),
      EndTime: dayjs('14:15', 'HH:mm').toDate(),
      roomId: 4,
      buildingId: 2,
    },
    {
      id: '12',
      Subject: 'Class',
      StartTime: dayjs('14:30', 'HH:mm').toDate(),
      EndTime: dayjs('15:45', 'HH:mm').toDate(),
      roomId: 4,
      buildingId: 2,
    },
    {
      id: '13',
      Subject: 'Class',
      StartTime: dayjs('11:30', 'HH:mm').toDate(),
      EndTime: dayjs('12:45', 'HH:mm').toDate(),
      roomId: 5,
      buildingId: 2,
    },
    {
      id: '14',
      Subject: 'Class',
      StartTime: dayjs('13:00', 'HH:mm').toDate(),
      EndTime: dayjs('14:15', 'HH:mm').toDate(),
      roomId: 5,
      buildingId: 2,
    },
    {
      id: '15',
      Subject: 'Class',
      StartTime: dayjs('17:30', 'HH:mm').toDate(),
      EndTime: dayjs('18:45', 'HH:mm').toDate(),
      roomId: 6,
      buildingId: 2,
    },
    {
      id: '16',
      Subject: 'Class',
      StartTime: dayjs('19:00', 'HH:mm').toDate(),
      EndTime: dayjs('21:45', 'HH:mm').toDate(),
      roomId: 6,
      buildingId: 2,
    },
    {
      id: '17',
      Subject: 'Class',
      StartTime: dayjs('08:30', 'HH:mm').toDate(),
      EndTime: dayjs('09:45', 'HH:mm').toDate(),
      roomId: 7,
      buildingId: 2,
    },
    {
      id: '18',
      Subject: 'Class',
      StartTime: dayjs('11:30', 'HH:mm').toDate(),
      EndTime: dayjs('12:45', 'HH:mm').toDate(),
      roomId: 7,
      buildingId: 2,
    },
    {
      id: '19',
      Subject: 'Class',
      StartTime: dayjs('14:30', 'HH:mm').toDate(),
      EndTime: dayjs('15:45', 'HH:mm').toDate(),
      roomId: 8,
      buildingId: 2,
    },
  ];
  return (
    <ScheduleComponent
      currentView="TimelineDay"
      readonly
      showHeaderBar={false}
      eventSettings={{ dataSource: scheduleData }}
      quickInfoTemplates={{ footer: () => <></> }}
      group={{ resources: ['Buildings', 'Rooms'], byGroupID: true }}
      startHour={props.startTime}
      endHour={props.endTime}
      resourceHeaderTemplate={(props: {
        resourceData: BuildingResource | RoomResource;
      }) => {
        const data = props.resourceData;
        if (data.type === 'building') {
          return (
            <div className="e-resource-text ml-0">
              <Skeleton variant="rounded">
                <p>{data.text}</p>
              </Skeleton>
            </div>
          );
        }
        return (
          <div className="e-resource-text ml-[25px]">
            <Skeleton variant="rounded">
              <p>{data.text}</p>
            </Skeleton>
          </div>
        );
      }}
    >
      <ResourcesDirective>
        <ResourceDirective
          field="buildingId"
          title="Building"
          name="Buildings"
          dataSource={buildingResources}
          textField="text"
          idField="id"
        />
        <ResourceDirective
          field="roomId"
          title="Room"
          name="Rooms"
          dataSource={roomResources}
          textField="text"
          idField="id"
          groupIDField="buildingId"
        />
      </ResourcesDirective>
      <ViewsDirective>
        <ViewDirective
          option="TimelineDay"
          //the loading-event class is used in globals.css
          eventTemplate={() => (
            <div className="loading-event w-full h-full">
              <Skeleton variant="rounded" className="w-full h-full" />
            </div>
          )}
        />
      </ViewsDirective>
      <Inject services={[TimelineViews]} />
    </ScheduleComponent>
  );
}

/**
 * Props type used by the ResultsTable component
 */
interface Props {
  rooms: GenericFetchedData<Rooms>;
  courseBookEvents: HierarchyStore<CourseBookEvent>;
  search: string;
}

/**
 * This is a component to hold results for room availablity in a table
 */
function ResultsTable(props: Props) {
  let state = 'done';

  //For getting filters
  const router = useRouter();

  let date = router.query.date;
  if (Array.isArray(date)) {
    date = date[0]; // if date is an array, make it a string
  }
  if (typeof date === 'undefined') {
    state = 'loading';
  }

  let startTime = router.query.startTime;
  if (Array.isArray(startTime)) {
    startTime = startTime[0];
  }
  startTime = startTime ?? '06:00';
  const dayjsStartTime = dayjs(startTime, 'HH:mm');
  let endTime = router.query.endTime;
  if (Array.isArray(endTime)) {
    endTime = endTime[0];
  }
  endTime = endTime ?? '23:00';
  const dayjsEndTime = dayjs(endTime, 'HH:mm');
  if (dayjsEndTime.isBefore(dayjsStartTime)) {
    state = 'error';
  }

  let buildings = router.query.buildings ?? [];
  if (!Array.isArray(buildings)) {
    buildings = buildings.split(','); // if buildings is a comma-delimited string, make it an array
  }

  const onlyAvailFullTime = router.query.onlyAvailFullTime === 'true';

  if (state === 'error') {
    return null;
  }
  const loading = (
    <LoadingResultsTable startTime={startTime} endTime={endTime} />
  );
  if (state === 'loading') {
    return loading;
  }

  const rooms = props.rooms;
  const courseBookEvents = props.courseBookEvents[date as string];

  //Loading state
  if (
    typeof rooms === 'undefined' ||
    rooms.state === 'loading' ||
    typeof courseBookEvents === 'undefined' ||
    courseBookEvents.state === 'loading'
  ) {
    return loading;
  }

  if (rooms.state === 'error' || courseBookEvents.state === 'error') {
    return null;
  }

  // Generate resource groups
  //to pass into calendar
  const buildingResources: BuildingResource[] = [];
  const roomResources: RoomResource[] = [];
  //to number them
  let buildingIdCounter = 1;
  let roomIdCounter = 1;
  //to get the number for the events
  const buildingIdMap = new Map();
  const roomIdMap = new Map();

  Object.entries(rooms.data)
    .toSorted(([a], [b]) => a.localeCompare(b))
    .forEach(([building, rooms]) => {
      if (
        !excludedBuildings.includes(building) &&
        (!buildings.length || buildings.includes(building))
      ) {
        buildingIdMap.set(building, buildingIdCounter++);
        buildingResources.push({
          type: 'building',
          id: buildingIdMap.get(building),
          text: building,
        });

        rooms.toSorted().forEach((room) => {
          //Check if free
          const events = courseBookEvents.data[building]?.[room] ?? [];
          const [completelyFree, hasGap] = findAvailability(
            events,
            dayjsStartTime,
            dayjsEndTime,
          );
          if (completelyFree || (hasGap && !onlyAvailFullTime)) {
            const roomName = `${building} ${room}`;
            //TODO: filter out rooms based on search, maybe only include if roomName.includes(search)?
            roomIdMap.set(roomName, roomIdCounter++);
            roomResources.push({
              type: 'room',
              id: roomIdMap.get(roomName),
              text: room,
              link: `https://locator.utdallas.edu/${building}_${room}`,
              buildingId: buildingIdMap.get(building), // Assign room to its building
            });
          }
        });
      }
    });

  // Convert events to correct format
  const scheduleData: EventSource[] = [];
  Object.entries(courseBookEvents.data).forEach(([building, rooms]) => {
    if (
      !excludedBuildings.includes(building) &&
      (!buildings.length || buildings.includes(building))
    ) {
      Object.entries(rooms).forEach(([room, events]) => {
        const roomName = `${building} ${room}`;
        const roomId = roomIdMap.get(roomName);
        //If room exists (it doesn't when its been filtered out)
        if (roomId) {
          events.forEach((event, index) => {
            scheduleData.push({
              id: `${roomIdMap.get(roomName)}-${index}`, // Unique event ID
              Subject: `Section ${event.section}`,
              StartTime: dayjs(
                date + event.start_time,
                'YYYY-MM-DDhh:mma',
              ).toDate(),
              EndTime: dayjs(
                date + event.end_time,
                'YYYY-MM-DDhh:mma',
              ).toDate(),
              roomId: roomId,
              buildingId: buildingIdMap.get(building),
            });
          });
        }
      });
    }
  });

  return (
    <ScheduleComponent
      currentView="TimelineDay"
      readonly
      showHeaderBar={false}
      rowAutoHeight={true}
      eventSettings={{ dataSource: scheduleData }}
      quickInfoTemplates={{ footer: () => <></> }}
      group={{ resources: ['Buildings', 'Rooms'], byGroupID: true }}
      selectedDate={dayjs(date).toDate()}
      startHour={startTime}
      endHour={endTime}
      resourceHeaderTemplate={(props: {
        resourceData: BuildingResource | RoomResource;
      }) => {
        const data = props.resourceData;
        if (data.type === 'building') {
          return <div className="e-resource-text ml-0">{data.text}</div>;
        }
        return (
          <div className="e-resource-text ml-[25px]">
            <Link
              href={data.link}
              target="_blank"
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              {data.text}
            </Link>
          </div>
        );
      }}
    >
      <ResourcesDirective>
        <ResourceDirective
          field="buildingId"
          title="Building"
          name="Buildings"
          dataSource={buildingResources}
          textField="text"
          idField="id"
        />
        <ResourceDirective
          field="roomId"
          title="Room"
          name="Rooms"
          dataSource={roomResources}
          textField="text"
          idField="id"
          groupIDField="buildingId"
        />
      </ResourcesDirective>
      <ViewsDirective>
        <ViewDirective option="TimelineDay" />
      </ViewsDirective>
      <Inject services={[TimelineViews]} />
    </ScheduleComponent>
  );
}

function findAvailability(
  events: CourseBookEvent[],
  calendarStart: Dayjs,
  calendarEnd: Dayjs,
): boolean[] {
  let times = Array(calendarEnd.diff(calendarStart, 'minute')).fill(true);
  let completelyFree = true;
  for (const event of events) {
    const eventStart = dayjs(event.start_time, 'h:mma');
    const eventEnd = dayjs(event.end_time, 'h:mma');
    if (
      isBetween(eventStart, calendarStart, calendarEnd) ||
      isBetween(eventEnd, calendarStart, calendarEnd)
    ) {
      completelyFree = false;
      let fillStart = 0;
      if (eventStart.isAfter(calendarStart)) {
        fillStart = eventStart.diff(calendarStart, 'minute');
      }
      let fillEnd = times.length - 1;
      if (eventEnd.isBefore(calendarEnd)) {
        fillEnd = eventEnd.diff(calendarStart, 'minute');
      }
      times = times.fill(false, fillStart, fillEnd);
    }
  }
  if (completelyFree) {
    return [true, true];
  }
  let freeMinutes = 0;
  for (const time of times) {
    if (time) {
      freeMinutes++;
      if (freeMinutes > 15) {
        return [false, true];
      }
    } else {
      freeMinutes = 0;
    }
  }
  return [false, false];
}

function isBetween(test: Dayjs, start: Dayjs, end: Dayjs) {
  return test.isAfter(start) && test.isBefore(end);
}

export default ResultsTable;
