import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// Use proxy during development to avoid CORS issues
const getBaseUrl = () => {
  if (
    typeof window !== 'undefined' &&
    window.location.hostname === 'localhost'
  ) {
    return '/api/proxy'; // Use Next.js proxy during development
  }
  return process.env.NEXT_PUBLIC_BASE_URL_LOCAL; // Use direct URL in production
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: headers => {
      const token = Cookies.get('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['User', 'about', 'products', 'blogs', 'contact'],
});

export default baseApi;
