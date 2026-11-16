import type * as z from 'zod';

function validateSchema<Schema extends z.ZodType>(data: unknown, schema: Schema): z.output<Schema> {
  return schema.parse(data);
}

export { validateSchema };
