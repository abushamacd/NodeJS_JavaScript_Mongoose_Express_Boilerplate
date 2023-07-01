const { role } = require("./user.constant");
const { z } = require("zod");

exports.createUserZod = z.object({
  body: z.object({
    name: z.string({
      required_error: "Zod: Name is required",
    }),
    phoneNumber: z.string({
      required_error: "Zod: Phone number is required",
    }),
    email: z.string({
      required_error: "Zod: Email is required",
    }),
    password: z.string({
      required_error: "Zod: Password is required",
    }),
    address: z.string({
      required_error: "Zod: Address is required",
    }),
  }),
});
exports.updateUserZod = z.object({
  body: z.object({
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    address: z.string().optional(),
  }),
});
