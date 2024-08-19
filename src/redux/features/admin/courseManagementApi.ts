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
    getAllResgisteredSemester: builder.query({
      query: () => ({
        url: "/semester-registrations",
        method: "GET",
      }),
      providesTags: ["semester"],
    }),
    updateSemesterResgistration: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),
  }),
});

export const {
  useCreateSemesterResgistrationMutation,
  useGetAllResgisteredSemesterQuery,
  useUpdateSemesterResgistrationMutation,
} = academicManagementApi;
