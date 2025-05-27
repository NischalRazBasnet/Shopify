import { mainApi } from '../../app/mainApi';

export const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    //get products
    getProducts: builder.query({
      query: (query) => ({
        url: '/products',
        method: 'GET',
        params: query,
      }),
      providesTags: ['Product'],
    }),

    //get product
    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['Products'],
    }),

    //get Top 5 Products
    getTop5Products: builder.query({
      query: (query) => ({
        url: '/products/top-5',
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),

    //add Product
    addProduct: builder.mutation({
      query: (query) => ({
        url: '/products',
        method: 'POST',
        body: query.body,
        headers: {
          Authorization: query.token,
        },
      }),
      invalidatesTags: ['Product'],
    }),

    //Update Product
    updateProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        method: 'PATCH',
        body: q.body,
        headers: {
          Authorization: q.token,
        },
      }),
      invalidatesTags: ['Products'],
    }),

    //delete Product
    removeProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        method: 'DELETE',
        headers: {
          Authorization: q.token,
        },
      }),
      invalidatesTags: ['Product'],
    }),
    addReview: builder.mutation({
      query: (q) => ({
        url: `/products/reviews/${q.id}`,
        body: q.body,
        method: 'PATCH',
        // headers: {
        //   Authorization: q.token
        // }
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetTop5ProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useAddReviewMutation,
} = productApi;
