'use client';

import { Skeleton, Tooltip } from '@mui/material';
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
import React from 'react';

import buildingNames, {
  excludedBuildings,
  excludedRooms,
  mapLinkOverrides,
  mergedBuildings,
} from '@/lib/buildingInfo';
import type {
  AstraEvent,
  CourseBookEvent,
  Hierarchy,
  MazevoEvent,
} from '@/types/Events';
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
interface EventSourceNoResource {
  Subject: string;
  StartTime: Date;
  EndTime: Date;
}
type EventSource = EventSourceNoResource & {
  id: string;
  roomId: number;
  buildingId: number;
};

interface LoadingProps {
  startTime: string;
  endTime: string;
}

export function LoadingResultsTable(props: LoadingProps) {
  const buildingResources = [
    {
      type: 'building',
      id: 1,
      text: 'Activity Center (AB)',
    },
    {
      type: 'building',
      id: 2,
      text: 'Administration Building (AD)',
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
    <>
      <p>Loading rooms...</p>
      <ScheduleComponent
        currentView="TimelineDay"
        readonly
        showHeaderBar={false}
        eventSettings={{ dataSource: scheduleData }}
        quickInfoTemplates={{ footer: () => <></> }}
        group={{
          resources: ['Buildings', 'Rooms'],
          byGroupID: true,
          enableCompactView: false,
        }}
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
        className="-mx-4 -mb-4 sm:m-0"
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
    </>
  );
}

/**
 * Props type used by the ResultsTable component
 */
interface Props {
  date: string;
  startTime: string | null;
  endTime: string | null;
  buildings: string[];
  fullAvailability: boolean;
  rooms: Rooms;
  courseBookEvents: Hierarchy<CourseBookEvent>;
  astraEvents: Hierarchy<AstraEvent>;
  mazevoEvents: Hierarchy<MazevoEvent>;
  search: string;
}

/**
 * This is a component to hold results for room availablity in a table
 */
export default function ResultsTable(props: Props) {
  const date = props.date;

  let startTime = props.startTime;
  if (date === dayjs().format('YYYY-MM-DD') && dayjs().hour() < 20) {
    //if looking at today and not too late, set start time to now
    startTime = startTime ?? dayjs().format('HH') + ':00';
  } else {
    startTime = startTime ?? '09:00';
  }
  const dayjsStartTime = dayjs(date + startTime, 'YYYY-MM-DDHH:mm');

  let endTime = props.endTime;
  endTime = endTime ?? '22:00';
  const dayjsEndTime = dayjs(date + endTime, 'YYYY-MM-DDHH:mm');

  if (dayjsEndTime.isBefore(dayjsStartTime)) {
    return null;
  }

  const buildings = props.buildings;

  const fullAvailability = props.fullAvailability;

  const search = props.search.trim();

  const rooms = props.rooms;
  const courseBookEvents = props.courseBookEvents;
  const astraEvents = props.astraEvents;
  const mazevoEvents = props.mazevoEvents;

  // Combine sources
  const combinedEvents: Hierarchy<EventSourceNoResource> = {};
  Object.entries(courseBookEvents).forEach(([building, rooms]) => {
    building = mergedBuildings[building] ?? building;
    if (
      !excludedBuildings.includes(building) &&
      (!buildings.length || buildings.includes(building))
    ) {
      combinedEvents[building] = combinedEvents[building] ?? {};
      Object.entries(rooms).forEach(([room, events]) => {
        const roomName = `${building} ${room}`;
        if (!excludedRooms.includes(roomName)) {
          combinedEvents[building][room] = combinedEvents[building][room] ?? [];
          events.forEach((event) => {
            combinedEvents[building][room].push({
              Subject: 'Class',
              StartTime: dayjs(
                date + event.start_time,
                'YYYY-MM-DDhh:mma',
              ).toDate(),
              EndTime: dayjs(
                date + event.end_time,
                'YYYY-MM-DDhh:mma',
              ).toDate(),
            });
          });
        }
      });
    }
  });
  Object.entries(astraEvents).forEach(([building, rooms]) => {
    building = mergedBuildings[building] ?? building;
    if (
      !excludedBuildings.includes(building) &&
      (!buildings.length || buildings.includes(building))
    ) {
      combinedEvents[building] = combinedEvents[building] ?? {};
      Object.entries(rooms).forEach(([room, events]) => {
        const roomName = `${building} ${room}`;
        if (!excludedRooms.includes(roomName)) {
          combinedEvents[building][room] = combinedEvents[building][room] ?? [];
          events.forEach((event) => {
            combinedEvents[building][room].push({
              Subject: event.activity_name,
              StartTime: dayjs(event.start_date).toDate(),
              EndTime: dayjs(event.end_date).toDate(),
            });
          });
        }
      });
    }
  });
  Object.entries(mazevoEvents).forEach(([building, rooms]) => {
    building = mergedBuildings[building] ?? building;
    if (
      !excludedBuildings.includes(building) &&
      (!buildings.length || buildings.includes(building))
    ) {
      combinedEvents[building] = combinedEvents[building] ?? {};
      Object.entries(rooms).forEach(([room, events]) => {
        const roomName = `${building} ${room}`;
        if (!excludedRooms.includes(roomName)) {
          combinedEvents[building][room] = combinedEvents[building][room] ?? [];
          events.forEach((event) => {
            combinedEvents[building][room].push({
              Subject: `${event.eventName} (${event.organizationName})`,
              StartTime: dayjs(event.dateTimeStart).toDate(),
              EndTime: dayjs(event.dateTimeEnd).toDate(),
            });
          });
        }
      });
    }
  });

  //Remove duplicates
  Object.values(combinedEvents).forEach((rooms) => {
    Object.entries(rooms).forEach(([room, events]) => {
      const eventMap = new Map<string, EventSourceNoResource>();
      events.forEach((event) => {
        const key = `${event.StartTime.getTime()}-${event.EndTime.getTime()}`;
        const existingEvent = eventMap.get(key);
        if (!existingEvent) {
          eventMap.set(key, event);
        } else if (
          existingEvent.Subject === 'Class' &&
          event.Subject !== 'Class'
        ) {
          // overwrite "Class" event with a more descriptive event
          eventMap.set(key, event);
        } else if (existingEvent.Subject !== event.Subject) {
          // merge subjects if they are different
          existingEvent.Subject += `, ${event.Subject}`;
        }
      });
      rooms[room] = Array.from(eventMap.values());
    });
  });

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

  Object.entries(rooms)
    .toSorted(([a], [b]) => a.localeCompare(b))
    .forEach(([building, rooms]) => {
      if (
        !excludedBuildings.includes(building) &&
        (!buildings.length || buildings.includes(building))
      ) {
        const buildingName = buildingNames[building];
        const buildingText = buildingName
          ? `${building} (${buildingName})`
          : building;
        buildingIdMap.set(building, buildingIdCounter++);
        buildingResources.push({
          type: 'building',
          id: buildingIdMap.get(building),
          text: buildingText,
        });

        rooms.toSorted().forEach((room) => {
          const roomName = `${building} ${room}`;
          if (!excludedRooms.includes(roomName)) {
            //Check if free
            const events = combinedEvents?.[building]?.[room] ?? [];
            const [completelyFree, hasGap] = findAvailability(
              events,
              dayjsStartTime,
              dayjsEndTime,
            );
            if (completelyFree || (hasGap && !fullAvailability)) {
              if (
                search === '' ||
                roomName.toLowerCase().startsWith(search.toLowerCase()) ||
                room.toLowerCase().startsWith(search.toLowerCase()) ||
                (buildingName &&
                  buildingName.toLowerCase().startsWith(search.toLowerCase()))
              ) {
                roomIdMap.set(roomName, roomIdCounter++);
                let link = `https://locator.utdallas.edu/${building}_${room}`;
                link = mapLinkOverrides[link] ?? link;
                roomResources.push({
                  type: 'room',
                  id: roomIdMap.get(roomName),
                  text: room,
                  link: link,
                  buildingId: buildingIdMap.get(building), // Assign room to its building
                });
              }
            }
          }
        });
      }
    });

  // Convert events to array
  const scheduleData: EventSource[] = [];
  Object.entries(combinedEvents).forEach(([building, rooms]) => {
    Object.entries(rooms).forEach(([room, events]) => {
      events.forEach((event, index) => {
        const roomName = `${building} ${room}`;
        const roomId = roomIdMap.get(roomName);
        //If room exists (it doesn't when its been filtered out)
        if (roomId) {
          scheduleData.push({
            id: `${roomId}-${index}`, // Unique event ID
            roomId: roomId,
            buildingId: buildingIdMap.get(building),
            ...event,
          });
        }
      });
    });
  });

  return (
    <>
      <p>
        {`Found ${roomResources.length}${
          fullAvailability
            ? roomResources.length === 1
              ? ' room that is completely free.'
              : ' rooms that are completely free.'
            : roomResources.length === 1
              ? ' room that has free time.'
              : ' rooms that have free time.'
        }`}
      </p>
      <ScheduleComponent
        currentView="TimelineDay"
        readonly
        showHeaderBar={false}
        eventSettings={{ dataSource: scheduleData }}
        quickInfoTemplates={{ footer: () => <></> }}
        group={{
          resources: ['Buildings', 'Rooms'],
          byGroupID: true,
          enableCompactView: false,
        }}
        selectedDate={dayjs(date).toDate()}
        startHour={startTime}
        endHour={endTime}
        resourceHeaderTemplate={(props: {
          resourceData: BuildingResource | RoomResource;
        }) => {
          const data = props.resourceData;
          if (data.type === 'building') {
            return (
              <Tooltip title={data.text}>
                <div className="e-resource-text ml-0 whitespace-nowrap overflow-hidden text-ellipsis">
                  {data.text}
                </div>
              </Tooltip>
            );
          }
          return (
            <div className="e-resource-text ml-[25px] text-clip">
              <Link
                href={data.link}
                target="_blank"
                className="font-bold text-lg text-blue-400 hover:text-blue-800 visited:text-purple-600"
              >
                {data.text}
              </Link>
            </div>
          );
        }}
        className="-mx-4 -mb-4 sm:m-0"
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
    </>
  );
}

function findAvailability(
  events: EventSourceNoResource[],
  calendarStart: Dayjs,
  calendarEnd: Dayjs,
): boolean[] {
  let times = Array(calendarEnd.diff(calendarStart, 'minute')).fill(true);
  let completelyFree = true;
  for (const event of events) {
    const eventStart = dayjs(event.StartTime);
    const eventEnd = dayjs(event.EndTime);
    if (eventStart.isBefore(calendarEnd) && eventEnd.isAfter(calendarStart)) {
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
