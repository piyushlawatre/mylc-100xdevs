import Joi from "joi";

export const UserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "in"] },
    })
    .message("Enter a valid email"),
  password: Joi.string().min(6).max(10).message("Enter a valid password"),
});
