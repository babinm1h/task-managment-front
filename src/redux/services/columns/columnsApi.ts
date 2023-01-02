import { IColumn } from "../../../types/entities.types";
import { Tags } from "../../../types/constants/tags";
import apiSlice from "../apiSlice";

const withTags = apiSlice.enhanceEndpoints({ addTagTypes: [Tags.COLUMNS] });

export const columnsApi = withTags.injectEndpoints({
  endpoints: (builder) => ({
    createColumn: builder.mutation<IColumn, { name: string; projectId: string }>({
      query: (payload) => ({
        url: `/columns/create/`,
        method: "POST",
        body: payload,
      }),
    }),

    deleteColumn: builder.mutation<IColumn, string>({
      query: (id) => ({
        url: `/columns/delete/${id}`,
        method: "DELETE",
      }),
    }),

    updateColumn: builder.mutation<IColumn, { name: string; id: string }>({
      query: ({ id, name }) => ({
        url: `/columns/update/${id}`,
        method: "PUT",
        body: { name },
      }),
    }),
  }),
});

export const { useCreateColumnMutation, useDeleteColumnMutation, useUpdateColumnMutation } = columnsApi;
