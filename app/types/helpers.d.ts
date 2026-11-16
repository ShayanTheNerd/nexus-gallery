import type * as z from 'zod';

type InferSchemas<Schemas extends Record<string, z.ZodType>> = {
  [Key in keyof Schemas]: z.output<Schemas[Key]>;
};

export type { InferSchemas };
