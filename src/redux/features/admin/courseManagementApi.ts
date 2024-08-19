import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSemesterResgistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations",
        method: "POST",
        body: data,
      }),
    }),

    getAllSemesterResgistration: builder.query({
      query: () => ({
        url: "/semester-registrations",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateSemesterResgistrationMutation,
  useGetAllSemesterResgistrationQuery,
} = academicManagementApi;
