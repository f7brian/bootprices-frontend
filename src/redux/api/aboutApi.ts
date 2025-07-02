import baseApi from "./baseApi";

const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: `/about`,
        method: "GET",
      }),
      providesTags: ["about"],
    }),
  }),
});

export const { useGetAboutQuery } = aboutApi;
