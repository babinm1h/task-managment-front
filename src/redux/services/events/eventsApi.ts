import { IEvent } from "../../../types/entities.types";
import apiSlice from "../apiSlice";

const withTags = apiSlice.enhanceEndpoints({ addTagTypes: [] });

export type TCreateEventArgs = Pick<IEvent, "date" | "name" | "time">;

export const eventsApi = withTags.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<IEvent, TCreateEventArgs>({
      query: (payload) => ({
        url: `/events/create/`,
        method: "POST",
        body: payload,
      }),
    }),

    deleteEvent: builder.mutation<IEvent, string>({
      query: (id) => ({
        url: `/events/delete/${id}`,
        method: "DELETE",
      }),
    }),

    updateEvent: builder.mutation<IEvent, any>({
      query: (payload) => ({
        url: `/events/update/`,
        method: "PUT",
        body: payload,
      }),
    }),

    getEvents: builder.query<IEvent[], void>({
      query: () => ({
        url: `/events`,
      }),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useGetEventsQuery,
  useLazyGetEventsQuery,
} = eventsApi;
