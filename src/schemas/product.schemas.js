const { z } = require('zod');

const originSchema = z.object({
  farm: z.string().max(255).optional(),
  region: z.string().max(255).optional(),
  batch: z.string().max(255).optional()
}).optional();

const productSchema = z.object({
  id: z.coerce.number().int().nonnegative(),
  name: z.string().max(255),
  price: z.coerce.number().int().nonnegative().optional(),
  description: z.string().max(2000).optional(),
  favorite: z.boolean().optional(),
  avatar: z.string().max(255).optional(),
  origin: originSchema
});

const partialProductSchema = productSchema.partial();

module.exports = {
  productSchema,
  partialProductSchema
};
