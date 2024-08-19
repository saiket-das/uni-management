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
    updateSemesterResgistration: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
    }),
  }),
});

export const {
  useCreateSemesterResgistrationMutation,
  useGetAllSemesterResgistrationQuery,
  useUpdateSemesterResgistrationMutation,
} = academicManagementApi;
