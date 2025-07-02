import baseApi from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        page,
        brand,
        searchTerm,
        category,
        sortBy,
        maxPrice,
        minPrice,
        gender,
      }) => ({
        url: `/products?page=${page}&brand=${brand}&searchTerm=${searchTerm}&category=${category}&sortBy=${sortBy}&maxPrice=${maxPrice}&minPrice=${minPrice}&gender=${gender}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
