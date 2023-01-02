import { useState, useEffect } from "react";
import { DateHelpers } from "../../helpers/dateHelpers";
import { notifyError } from "../../helpers/toastHelpers";
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useLazyGetEventsQuery,
  TCreateEventArgs,
  TUpdateEventArgs,
} from "../../redux/services/events/eventsApi";
import { IEvent } from "../../types/entities.types";

export const useEventsCalendar = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [createEvent] = useCreateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [getEvents, { isLoading }] = useLazyGetEventsQuery();

  const hoursArr = DateHelpers.getHoursArr();

  const onCreateEvent = async (eventDto: TCreateEventArgs) => {
    try {
      const event = await createEvent(eventDto).unwrap();
      setEvents((prev) => [...prev, event]);
    } catch (err: any) {
      notifyError(err?.data?.message);
    }
  };

  const onDeleteEvent = async (id: string) => {
    try {
      setEvents((prev) => prev.filter((ev) => ev._id !== id));
      await deleteEvent(id).unwrap();
    } catch (err: any) {
      notifyError(err?.data.message);
    }
  };

  const onUpdateEvent = async (dto: TUpdateEventArgs) => {
    const { id, ...args } = dto;
    try {
      await updateEvent(dto).unwrap();
      setEvents((prev) =>
        prev.map((ev) => {
          if (ev._id === dto.id) {
            return { ...ev, ...args };
          }
          return ev;
        })
      );
    } catch (err: any) {
      notifyError(err?.data.message);
    }
  };

  const fetchEvents = async () => {
    try {
      const evs = await getEvents().unwrap();
      if (evs) {
        setEvents(evs);
      }
    } catch (err: any) {
      notifyError(err?.data?.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { onUpdateEvent, onDeleteEvent, onCreateEvent, hoursArr, events, isLoading };
};
