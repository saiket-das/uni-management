import { QueryParamProps, ResponseReduxProps } from "../../../types";
import {
  CourseProps,
  FacultyWithCourseProps,
  SemesterResgistrationProps,
} from "../../../types/courseManagement.types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Registered semester
    createSemesterResgistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    getAllResgisteredSemester: builder.query({
      // query: () => ({
      //   url: "/semester-registrations",
      //   method: "GET",
      // }),
      // query: (args) => {
      //   const params = new URLSearchParams();
      //   if (args) {
      //     args.forEach((item: QueryParamProps) => {
      //       params.append(item.name, item.value as string);
      //     });
      //   }
      //   return {
      //     url: "/semester-registrations",
      //     method: "GET",
      //     params,
      //   };

      // },

      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: QueryParamProps) => {
            params.append(item.name, item.value as string);
          });
        }
        return { url: "/semester-registrations", method: "GET", params };
      },
      transformResponse: (
        response: ResponseReduxProps<SemesterResgistrationProps[]>
      ) => {
        return {
          data: response.data,
        };
      },
    }),

    updateSemesterResgistration: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),

    // Courses
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    getAllCourses: builder.query({
      query: () => {
        return { url: "/courses", method: "GET" };
      },
      transformResponse: (response: ResponseReduxProps<CourseProps[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["course"],
    }),

    assignCourseToFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-course-to-faculties`,
        method: "PUT",
        body: args.data,
      }),
    }),

    getFacultiesWithCourse: builder.query({
      query: (courseId) => {
        return { url: `/courses/${courseId}/get-faculties`, method: "GET" };
      },
      transformResponse: (
        response: ResponseReduxProps<FacultyWithCourseProps>
      ) => {
        return response.data;
      },
    }),

    // Offered courses
    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "/offered-courses",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSemesterResgistrationMutation,
  useGetAllResgisteredSemesterQuery,
  useUpdateSemesterResgistrationMutation,
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useAssignCourseToFacultiesMutation,
  useGetFacultiesWithCourseQuery,
  useCreateOfferedCourseMutation,
} = academicManagementApi;
