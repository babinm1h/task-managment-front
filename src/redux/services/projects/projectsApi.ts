import { IProject } from "../../../types/entities.types";
import { Tags } from "../../../types/constants/tags";
import apiSlice from "../apiSlice";

const withTags = apiSlice.enhanceEndpoints({ addTagTypes: [Tags.PROJECTS, Tags.COLUMNS] });

export const projectsApi = withTags.injectEndpoints({
  endpoints: (builder) => ({
    getMyProjects: builder.query<IProject[], void>({
      providesTags: [Tags.PROJECTS],
      query: () => ({
        url: "/projects",
      }),
    }),

    createProject: builder.mutation<IProject, { name: string }>({
      invalidatesTags: [Tags.PROJECTS],
      query: (args) => ({
        url: "/projects/create",
        method: "POST",
        body: args,
      }),
    }),

    deleteProject: builder.mutation<IProject, { id: string }>({
      invalidatesTags: [Tags.PROJECTS],
      query: ({ id }) => ({
        url: `/projects/delete/${id}`,
        method: "DELETE",
      }),
    }),

    getProjectById: builder.query<IProject, string>({
      query: (id) => ({
        url: `/projects/${id}`,
      }),
      providesTags: (res) => [{ type: Tags.PROJECTS, id: res?._id }],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useLazyGetMyProjectsQuery,
  useLazyGetProjectByIdQuery,
} = projectsApi;
