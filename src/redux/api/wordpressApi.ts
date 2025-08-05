import { WordPressPost } from '@/types/wordpress';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wordpressApi = createApi({
  reducerPath: 'wordpressApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
    prepareHeaders: headers => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    getBlogs: builder.query<WordPressPost[], { page?: number; limit?: number }>(
      {
        query: ({ page = 1, limit = 12 }) => ({
          url: `/posts?page=${page}&per_page=${limit}&_embed&_fields=id,date,slug,title,content,excerpt,featured_media,meta,rankmath_head,_links,_embedded`,
          method: 'GET',
        }),
        providesTags: ['blogs'],
      }
    ),

    // get single blog
    getSingleBlog: builder.query<WordPressPost, string>({
      query: slug => ({
        url: `/posts?slug=${slug}&_embed&_fields=id,date,slug,title,content,excerpt,featured_media,meta,rankmath_head,_links,_embedded`,
        method: 'GET',
      }),
      providesTags: ['blogs'],
      transformResponse: (response: WordPressPost[]) => response[0], // WordPress returns array for slug query
    }),
  }),
  tagTypes: ['blogs'],
});

export const { useGetBlogsQuery, useGetSingleBlogQuery } = wordpressApi;
