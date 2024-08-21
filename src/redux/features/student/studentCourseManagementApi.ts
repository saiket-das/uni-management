import { QueryParamProps, ResponseReduxProps } from "../../../types";
import { MyOfferedCourseProps } from "../../../types/studentCourseManagement.types";

import { baseApi } from "../../api/baseApi";

const studentCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAllOfferedCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: QueryParamProps) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (
        response: ResponseReduxProps<MyOfferedCourseProps[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["offered-course"],
    }),

    enrollCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offered-course"],
    }),
  }),
});

export const { useGetMyAllOfferedCourseQuery, useEnrollCourseMutation } =
  studentCourseManagementApi;
