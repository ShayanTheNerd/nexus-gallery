import type { InferSchemas } from '~/types/helpers.d.ts';

import * as z from 'zod';

const ProductsSchemas = {
  getItems: z.array(
    z.object({
      id: z.int().positive(),
      title: z.string(),
      price: z.number().nonnegative(),
      description: z.string(),
      image: z.url(),
    }),
  ),
};

type Products = InferSchemas<typeof ProductsSchemas>;

export { ProductsSchemas };
export type { Products };
