const { z } = require("zod");
const { categories, labels, locations } = require("../constants/data.constant");

exports.createDataZod = z.object({
  body: z.object({
    name: z.string({
      required_error: "Zod: Name is required",
    }),
    age: z.number({
      required_error: "Zod: Age is required",
    }),
    price: z.number({
      required_error: "Zod: Price is required",
    }),
    location: z.enum([...locations], {
      required_error: "Zod: Location is required",
    }),
    breed: z.string({
      required_error: "Zod: Breed is required",
    }),
    weight: z.number({
      required_error: "Zod: Weight is required",
    }),
    label: z.enum([...labels], {
      required_error: "Zod: Label is required",
    }),
    category: z.enum([...categories], {
      required_error: "Zod: Category is required",
    }),
    seller: z.string({
      required_error: "Zod: Seller is required",
    }),
  }),
});

exports.updateDataZod = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...locations]).optional(),
    breed: z.string().optional(),
    weight: z.number().optional(),
    label: z.enum([...labels]).optional(),
    category: z.enum([...categories]).optional(),
    seller: z.string().optional(),
  }),
});
