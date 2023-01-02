import { ITask } from "../../../types/entities.types";
import { Tags } from "../../../types/constants/tags";
import apiSlice from "../apiSlice";

interface IUpdateTaskArgs {
  text?: string;
  deadline?: Date;
  columnId?: string;
  id: string;
  toIndex?: number;
  fromIndex?: number;
  completed?: boolean;
}

const withTags = apiSlice.enhanceEndpoints({ addTagTypes: [Tags.TASKS] });

export const tasksApi = withTags.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<ITask, { text: string; columnId: string; deadline: Date }>({
      query: (payload) => ({
        url: `/tasks/create/`,
        method: "POST",
        body: payload,
      }),
    }),

    deleteTask: builder.mutation<ITask, string>({
      query: (id) => ({
        url: `/tasks/delete/${id}`,
        method: "DELETE",
      }),
    }),

    updateTask: builder.mutation<ITask, IUpdateTaskArgs>({
      query: ({ id, ...payload }) => ({
        url: `/tasks/update/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi;
