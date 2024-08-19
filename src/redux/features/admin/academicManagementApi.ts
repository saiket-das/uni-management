import { QueryParamProps, ResponseReduxProps } from "../../../types";
import {
  AcademicDepartmentProps,
  AcademicFacultyProps,
  AcademicSemesterProps,
} from "../../../types/academicManagement.types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: QueryParamProps) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params,
        };
      },
      transformResponse: (
        response: ResponseReduxProps<AcademicSemesterProps[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),

    getAcademicFaculties: builder.query({
      query: () => {
        return { url: "/academic-faculties", method: "GET" };
      },
      transformResponse: (
        response: ResponseReduxProps<AcademicFacultyProps[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getAcademicDepartments: builder.query({
      query: () => {
        return { url: "/academic-departments", method: "GET" };
      },
      transformResponse: (
        response: ResponseReduxProps<AcademicDepartmentProps[]>
      ) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetAllAcademicSemestersQuery,
  useCreateAcademicSemesterMutation,
  useGetAcademicFacultiesQuery,
  useGetAcademicDepartmentsQuery,
} = academicManagementApi;
