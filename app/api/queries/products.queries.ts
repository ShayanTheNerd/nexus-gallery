import type { QueryClient } from '@tanstack/react-query';

import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query';

import { apiClient } from '~/api/apiClient.ts';
import { ProductsSchemas } from '~/schemas/products.schemas.ts';
import { validateSchema } from '~/utils/validateSchema.ts';

const productsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: async () => {
    const { data } = await apiClient.get<unknown>('/products');
    const products = validateSchema(data, ProductsSchemas.getItems);
    return products;
  },
});

const productsPageSize = 4;

function productsInfiniteQueryOptions(queryClient: QueryClient) {
  return infiniteQueryOptions({
    queryKey: ['products', 'infinite'],
    initialPageParam: 0,
    retry: 0,
    queryFn: async ({ pageParam }) => {
      const products = await queryClient.query({
        ...productsQueryOptions,
        staleTime: 'static',
      });
      const paginatedProducts = products.slice(pageParam, pageParam + productsPageSize);
      const nextOffset = pageParam + paginatedProducts.length;

      return {
        products: paginatedProducts,
        nextOffset: nextOffset < products.length ? nextOffset : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
}

export { productsInfiniteQueryOptions };
