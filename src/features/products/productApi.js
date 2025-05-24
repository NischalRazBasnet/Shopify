import { mainApi } from '../../app/mainApi.js';

export const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => ({
        url: '/products',
        method: 'GET',
        params: query,
      }),
    }),

    getTop5Products: builder.query({
      query: (query) => ({
        url: '/products/top-5',
        method: 'GET',
      }),
    }),

    addProduct: builder.mutation({
      query: (query) => ({
        url: '/products',
        method: 'POST',
        body: query.body,
        headers: {
          Authorization: query.token,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetTop5ProductsQuery,
  useAddProductMutation,
} = productApi;
