import {
  Inject,
  ResourceDirective,
  ResourcesDirective,
  ScheduleComponent,
  TimelineViews,
  ViewDirective,
  ViewsDirective,
} from '@syncfusion/ej2-react-schedule';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import type { HierarchyStore } from '@/modules/useEventsStore';
import type { CourseBookEvent } from '@/types/Events';
import type { GenericFetchedData } from '@/types/GenericFetchedData';
import type { Rooms } from '@/types/Rooms';

interface BuildingResource {
  Id: number;
  Text: string;
}
interface RoomResource {
  Id: number;
  Text: string;
  BuildingId: number;
}
interface EventSource {
  Id: string;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  RoomId: number;
  BuildingId: number;
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
export function ResultsTable(props: Props) {
  let state = 'done';
  //TODO: make look better
  const loading = <>loading</>;

  //For getting filters
  const router = useRouter();

  let date = router.query.date;
  if (Array.isArray(date)) {
    date = date[0]; // if date is an array, make it a string
  }
  if (typeof date === 'undefined') {
    return loading;
  }

  let startTime = router.query.startTime;
  if (Array.isArray(startTime)) {
    startTime = startTime[0];
  }
  startTime = startTime ?? '06:00';
  let endTime = router.query.endTime;
  if (Array.isArray(endTime)) {
    endTime = endTime[0];
  }
  endTime = endTime ?? '23:00';
  if (dayjs(endTime, 'HH:mm').isBefore(dayjs(startTime, 'HH:mm'))) {
    state = 'error';
  }

  let buildings = router.query.buildings ?? [];
  if (!Array.isArray(buildings)) {
    buildings = buildings.split(','); // if buildings is a comma-delimited string, make it an array
  }

  if (state === 'error') {
    return null;
  }

  const rooms = props.rooms;
  const courseBookEvents = props.courseBookEvents[date];

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
  const buildingResources: BuildingResource[] = [];
  const roomResources: RoomResource[] = [];
  let buildingIdCounter = 1;
  let roomIdCounter = 1;
  const buildingIdMap = new Map();
  const roomIdMap = new Map();
  Object.entries(rooms.data)
    .toSorted(([a], [b]) => a.localeCompare(b))
    .forEach(([building, rooms]) => {
      if (!buildings.length || buildings.includes(building)) {
        if (!buildingIdMap.has(building)) {
          buildingIdMap.set(building, buildingIdCounter++);
          buildingResources.push({
            Id: buildingIdMap.get(building),
            Text: building,
          });
        }

        rooms.toSorted().forEach((room) => {
          const roomName = `${building} ${room}`;
          if (!roomIdMap.has(roomName)) {
            roomIdMap.set(roomName, roomIdCounter++);
            roomResources.push({
              Id: roomIdMap.get(roomName),
              Text: room,
              BuildingId: buildingIdMap.get(building), // Assign room to its building
            });
          }
        });
      }
    });

  // Convert events to correct format
  const scheduleData: EventSource[] = [];
  Object.entries(courseBookEvents.data).forEach(([building, rooms]) => {
    Object.entries(rooms).forEach(([room, events]) => {
      const roomName = `${building} ${room}`;
      events.forEach((event, index) => {
        scheduleData.push({
          Id: `${roomIdMap.get(roomName)}-${index}`, // Unique event ID
          Subject: `Section ${event.section}`,
          StartTime: dayjs(
            date + event.start_time,
            'YYYY-MM-DDhh:mma',
          ).toDate(),
          EndTime: dayjs(date + event.end_time, 'YYYY-MM-DDhh:mma').toDate(),
          RoomId: roomIdMap.get(roomName),
          BuildingId: buildingIdMap.get(building),
        });
      });
    });
  });

  return (
    <ScheduleComponent
      currentView="TimelineDay"
      readonly
      showHeaderBar={false}
      eventSettings={{ dataSource: scheduleData }}
      quickInfoTemplates={{ footer: () => <></> }}
      group={{ resources: ['Buildings', 'Rooms'], byGroupID: true }}
      selectedDate={dayjs(date).toDate()}
      startHour={startTime}
      endHour={endTime}
    >
      <ResourcesDirective>
        <ResourceDirective
          field="BuildingId"
          title="Building"
          name="Buildings"
          dataSource={buildingResources}
          textField="Text"
          idField="Id"
        />
        <ResourceDirective
          field="RoomId"
          title="Room"
          name="Rooms"
          dataSource={roomResources}
          textField="Text"
          idField="Id"
          groupIDField="BuildingId"
        />
      </ResourcesDirective>
      <ViewsDirective>
        <ViewDirective option="TimelineDay" />
      </ViewsDirective>
      <Inject services={[TimelineViews]} />
    </ScheduleComponent>
  );
}

export default ResultsTable;
