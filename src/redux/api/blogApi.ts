import baseApi from "./baseApi";

interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  _links: {
    "wp:featuredmedia"?: {
      embeddable: boolean;
      href: string;
    }[];
  };
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
      alt_text?: string;
    }[];
  };
}

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<WordPressPost[], {page?: number, limit?: number}>({
      query: ({page = 1, limit = 12}) => ({
        url: `/posts?page=${page}&per_page=${limit}&_embed`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),

    // get single blog
    getSingleBlog: builder.query<WordPressPost, string>({
      query: (slug) => ({
        url: `/posts?slug=${slug}&_embed`,
        method: "GET",
      }),
      providesTags: ["blogs"],
      transformResponse: (response: WordPressPost[]) => response[0], // WordPress returns array for slug query
    }),
  }),
});

export const { useGetBlogsQuery, useGetSingleBlogQuery } = blogApi;
