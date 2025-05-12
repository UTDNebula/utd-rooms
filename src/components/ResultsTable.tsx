'use client';

import { Button, Skeleton, Tooltip } from '@mui/material';
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
import React, { useEffect, useState } from 'react';

import buildingNames, {
  buildingLocationHardcodes,
  buildingMapOverrides,
  excludedBuildings,
  excludedRooms,
  mapLinkOverrides,
  mergedBuildings,
} from '@/lib/buildingInfo';
import {
  dummyBuildingResources,
  dummyRoomResources,
  dummyScheduleData,
} from '@/lib/dummyLoadingData';
import { defaultEndTime, defaultStartTime } from '@/lib/snapTime';
import type {
  AstraEvent,
  CourseBookEvent,
  Hierarchy,
  MazevoEvent,
} from '@/types/Events';
import type { GenericFetchedData } from '@/types/GenericFetchedData';
import type { Rooms } from '@/types/Rooms';

interface BuildingResource {
  type: 'building';
  id: number;
  text: string;
  distance: number | null;
}
interface RoomResource {
  type: 'room';
  id: number;
  text: string;
  capacity: number | null;
  link: string;
  buildingId: number;
}
interface EventSourceNoResource {
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  pending?: boolean;
}
type EventSource = EventSourceNoResource & {
  id: string;
  roomId: number;
  buildingId: number;
};

interface LoadingProps {
  text?: string;
  startTime: string;
  endTime: string;
}

export function LoadingResultsTable(props: LoadingProps) {
  return (
    <>
      <p>{props.text ?? 'Loading rooms...'}</p>
      <ScheduleComponent
        currentView="TimelineDay"
        readonly
        showHeaderBar={false}
        rowAutoHeight={true}
        eventSettings={{
          dataSource: dummyScheduleData,
          ignoreWhitespace: true,
        }}
        quickInfoTemplates={{ footer: () => <></> }}
        group={{
          resources: ['Buildings', 'Rooms'],
          byGroupID: true,
          enableCompactView: false,
        }}
        startHour={props.startTime.split(':')[0] + ':00'}
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
        workHours={{
          //buildings open/close times
          highlight: true,
          start: '6:00',
          end: '22:00',
        }}
      >
        <ResourcesDirective>
          <ResourceDirective
            field="buildingId"
            title="Building"
            name="Buildings"
            dataSource={dummyBuildingResources}
            textField="text"
            idField="id"
          />
          <ResourceDirective
            field="roomId"
            title="Room"
            name="Rooms"
            dataSource={dummyRoomResources}
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

interface ErrorProps {
  text: string;
}

function ErrorResultsTable(props: ErrorProps) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center px-8 py-16">
      <p className="text-xl text-gray-700 dark:text-gray-300">
        {`Error ${props.text}. Please reload the page.`}
      </p>
      <Button onClick={() => window.location.reload()} variant="contained">
        Reload
      </Button>
    </div>
  );
}

// From: https://henry-rossiter.medium.com/calculating-distance-between-geographic-coordinates-with-javascript-5f3097b61898
function cosineDistanceBetweenPoints(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371e3;
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const deltaP = p2 - p1;
  const deltaLon = lon2 - lon1;
  const deltaLambda = (deltaLon * Math.PI) / 180;
  const a =
    Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
    Math.cos(p1) *
      Math.cos(p2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R;
  return d;
}

function metersToMiles(distance: number) {
  return distance / 1000 / 1.609;
}

/**
 * Props type used by the ResultsTable component
 */
interface Props {
  date: string;
  startTime: string | null;
  endTime: string | null;
  minCapacity: string;
  buildings: string[];
  fullAvailability: boolean;
  rooms: GenericFetchedData<Rooms>;
  courseBookEvents: GenericFetchedData<Hierarchy<CourseBookEvent>>;
  astraEvents: GenericFetchedData<Hierarchy<AstraEvent>>;
  mazevoEvents: GenericFetchedData<Hierarchy<MazevoEvent>>;
  search: string;
}

/**
 * This is a component to hold results for room availablity in a table
 */
export default function ResultsTable(props: Props) {
  const [error, setError] = useState('');

  const date = props.date;

  let startTime = props.startTime;
  startTime = startTime ?? defaultStartTime + ':00';
  const dayjsStartTime = dayjs(date + startTime, 'YYYY-MM-DDHH:mm');

  let endTime = props.endTime;
  endTime = endTime ?? defaultEndTime + ':00';
  const dayjsEndTime = dayjs(date + endTime, 'YYYY-MM-DDHH:mm');

  const minCapacity = isNaN(parseInt(props.minCapacity))
    ? 0
    : parseInt(props.minCapacity);

  const buildings = props.buildings;
  const nearby = buildings[0] === 'nearby';
  const [location, setLocation] = useState<number[]>([]);
  useEffect(() => {
    if (
      nearby &&
      typeof window !== 'undefined' &&
      'permissions' in navigator &&
      'geolocation' in navigator
    ) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        () => setError('getting your location'),
        {
          enableHighAccuracy: true,
          maximumAge: 60000, //up to one minute old
        },
      );
    }
  }, [nearby]);
  if (nearby && !location.length) {
    return (
      <LoadingResultsTable
        text="Getting your location..."
        startTime={startTime}
        endTime={endTime}
      />
    );
  }
  if (error) {
    //print error message
    return <ErrorResultsTable text={error} />;
  }

  const fullAvailability = props.fullAvailability;

  const search = props.search.trim().toLowerCase();

  if (dayjsEndTime.isBefore(dayjsStartTime)) {
    return null;
  }

  const rooms = props.rooms;

  const courseBookEvents = props.courseBookEvents;
  const astraEvents = props.astraEvents;
  const mazevoEvents = props.mazevoEvents;

  if (
    rooms.message !== 'success' ||
    courseBookEvents.message !== 'success' ||
    astraEvents.message !== 'success' ||
    mazevoEvents.message !== 'success'
  ) {
    return <ErrorResultsTable text="getting data" />;
  }

  // Combine sources
  const combinedEvents: Hierarchy<EventSourceNoResource> = {};
  Object.entries(courseBookEvents.data).forEach(([building, rooms]) => {
    building = mergedBuildings[building] ?? building;
    if (
      !excludedBuildings.includes(building) &&
      (!buildings.length || nearby || buildings.includes(building))
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
  Object.entries(astraEvents.data).forEach(([building, rooms]) => {
    building = mergedBuildings[building] ?? building;
    if (
      !excludedBuildings.includes(building) &&
      (!buildings.length || nearby || buildings.includes(building))
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
              // null current_state is a class
              ...(event.current_state !== 'Scheduled' &&
              event.current_state != null
                ? { pending: true }
                : {}),
            });
          });
        }
      });
    }
  });
  Object.entries(mazevoEvents.data).forEach(([building, rooms]) => {
    building = mergedBuildings[building] ?? building;
    if (
      !excludedBuildings.includes(building) &&
      (!buildings.length || nearby || buildings.includes(building))
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
              ...(event.statusDescription !== 'Confirmed'
                ? { pending: true }
                : {}),
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

  Object.entries(rooms.data).forEach(([building, info]) => {
    if (
      !excludedBuildings.includes(building) &&
      (!buildings.length || nearby || buildings.includes(building))
    ) {
      const buildingName = buildingNames[building];
      const buildingText = buildingName ? buildingName : building;
      const lat = buildingLocationHardcodes[building]
        ? buildingLocationHardcodes[building][0]
        : buildingMapOverrides[building]
          ? rooms.data[buildingMapOverrides[building]].lat
          : info.lat;
      const lng = buildingLocationHardcodes[building]
        ? buildingLocationHardcodes[building][1]
        : buildingMapOverrides[building]
          ? rooms.data[buildingMapOverrides[building]].lng
          : info.lng;
      buildingIdMap.set(building, buildingIdCounter++);
      buildingResources.push({
        type: 'building',
        id: buildingIdMap.get(building),
        text: buildingText,
        distance:
          lat === null || lng === null || !location.length
            ? null
            : cosineDistanceBetweenPoints(location[0], location[1], lat, lng),
      });

      info.rooms
        .toSorted((a, b) => a.room.localeCompare(b.room))
        .forEach((room) => {
          const roomName = `${building} ${room.room}`;
          if (
            !excludedRooms.includes(roomName) &&
            (minCapacity === 0 ||
              (room.capacity !== 0 && room.capacity >= minCapacity))
          ) {
            //Check if free
            const events = combinedEvents?.[building]?.[room.room] ?? [];
            const [completelyFree, hasGap] = findAvailability(
              events,
              dayjsStartTime,
              dayjsEndTime,
            );
            if (completelyFree || (hasGap && !fullAvailability)) {
              if (
                search === '' ||
                roomName.toLowerCase().startsWith(search) ||
                room.room.toLowerCase().startsWith(search) ||
                (buildingName &&
                  buildingName
                    .split(' (')[1]
                    .toLowerCase()
                    .startsWith(search)) ||
                events.some((event) =>
                  event.Subject.toLowerCase().startsWith(search),
                )
              ) {
                roomIdMap.set(roomName, roomIdCounter++);
                const mapBuilding = buildingMapOverrides[building] ?? building;
                let link = `https://locator.utdallas.edu/${mapBuilding}_${room.room}`;
                link = mapLinkOverrides[link] ?? link;
                roomResources.push({
                  type: 'room',
                  id: roomIdMap.get(roomName),
                  text: room.room,
                  capacity: room.capacity,
                  link: link,
                  buildingId: buildingIdMap.get(building), // Assign room to its building
                });
              }
            }
          }
        });
    }
  });

  if (nearby) {
    // Sort buildings by distance
    buildingResources.sort((a, b) => {
      if (a.distance === null && b.distance === null) {
        return 0;
      }
      if (a.distance === null) {
        return 1;
      }
      if (b.distance === null) {
        return -1;
      }
      return a.distance - b.distance;
    });
  } else {
    // Sort buildings by the number of open rooms
    buildingResources.sort(
      (a, b) =>
        roomResources.filter((room) => room.buildingId === b.id).length -
        roomResources.filter((room) => room.buildingId === a.id).length,
    );
  }

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
        }${minCapacity !== 0 ? ' Rooms with unknown capacity excluded.' : ''}${nearby ? ' Sorted by distance.' : ''}`}
      </p>
      <ScheduleComponent
        currentView="TimelineDay"
        readonly
        showHeaderBar={false}
        rowAutoHeight={true}
        eventSettings={{ dataSource: scheduleData, ignoreWhitespace: true }}
        quickInfoTemplates={{ footer: () => <></> }}
        group={{
          resources: ['Buildings', 'Rooms'],
          byGroupID: true,
          enableCompactView: false,
        }}
        selectedDate={dayjs(date).toDate()}
        startHour={startTime.split(':')[0] + ':00'}
        endHour={endTime}
        resourceHeaderTemplate={(props: {
          resourceData: BuildingResource | RoomResource;
        }) => {
          const data = props.resourceData;
          if (data.type === 'building') {
            return (
              <Tooltip
                title={
                  <>
                    {data.text}
                    {location.length ? (
                      <>
                        <br />
                        Distance:{' '}
                        {data.distance !== null
                          ? Math.round(metersToMiles(data.distance) * 100) /
                              100 +
                            ' miles'
                          : 'unknown'}
                      </>
                    ) : (
                      ''
                    )}
                  </>
                }
              >
                <div className="e-resource-text ml-0 whitespace-nowrap overflow-hidden text-ellipsis">
                  {data.text}
                </div>
              </Tooltip>
            );
          }
          return (
            <Tooltip
              title={
                <>
                  {data.text}
                  <br />
                  Capacity: {data.capacity !== 0 ? data.capacity : 'unknown'}
                </>
              }
            >
              <div className="e-resource-text ml-[25px] overflow-hidden text-ellipsis">
                <Link
                  href={data.link}
                  target="_blank"
                  className="font-bold text-lg text-purple-300 hover:text-purple-400 visited:text-purple-600"
                >
                  {data.text}
                </Link>
              </div>
            </Tooltip>
          );
        }}
        className="-mx-4 -mb-4 sm:m-0"
        workHours={{
          //buildings open/close times
          highlight: true,
          start: '6:00',
          end: '22:00',
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
            eventTemplate={(props: EventSource) => {
              const timeString = `${props.pending ? 'Pending: ' : ''}${dayjs(props.StartTime).format('h:mm a')} - ${dayjs(props.EndTime).format('h:mm a')}`;
              return (
                <div
                  className={
                    'e-inner-wrap' + (props.pending ? ' pending-event' : '')
                  }
                >
                  <Tooltip title={props.Subject}>
                    <div className="e-subject">{props.Subject}</div>
                  </Tooltip>
                  <Tooltip title={timeString}>
                    <div className="e-time">{timeString}</div>
                  </Tooltip>
                </div>
              );
            }}
          />
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
