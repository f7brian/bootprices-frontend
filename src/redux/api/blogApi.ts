import baseApi from "./baseApi";
import { WordPressPost } from "@/types/wordpress";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<WordPressPost[], {page?: number, limit?: number}>({
      query: ({page = 1, limit = 12}) => ({
        url: `/posts?page=${page}&per_page=${limit}&_embed&_fields=id,date,slug,title,content,excerpt,featured_media,meta,rankmath_head,_links,_embedded`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),

    // get single blog
    getSingleBlog: builder.query<WordPressPost, string>({
      query: (slug) => ({
        url: `/posts?slug=${slug}&_embed&_fields=id,date,slug,title,content,excerpt,featured_media,meta,rankmath_head,_links,_embedded`,
        method: "GET",
      }),
      providesTags: ["blogs"],
      transformResponse: (response: WordPressPost[]) => response[0], // WordPress returns array for slug query
    }),
  }),
});

export const { useGetBlogsQuery, useGetSingleBlogQuery } = blogApi;
