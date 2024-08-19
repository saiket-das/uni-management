import { QueryParamProps, ResponseReduxProps } from "../../../types";
import { StudentProps } from "../../../types/userManagement.types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),

    // Create faculty
    createFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),

    // Create admin
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),

    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: QueryParamProps) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: ResponseReduxProps<StudentProps[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["student"],
    }),

    getStudentById: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}`,
        method: "GET",
      }),
    }),

    deleteStudentById: builder.mutation({
      query: (studentId) => ({
        url: `/students/${studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useCreateFacultyMutation,
  useCreateAdminMutation,
  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useDeleteStudentByIdMutation,
} = userManagementApi;
