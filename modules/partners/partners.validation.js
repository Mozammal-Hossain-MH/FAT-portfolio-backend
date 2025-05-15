import { array, mixed, object, string } from "yup";

export const partnersSchema = object({
  id: mixed()
    .transform((value) => {
      const num = Number(value);
      return isNaN(num) ? value : num;
    })
    .when("$isUpdate", {
      is: true,
      then: (schema) => schema.required("ID is required"),
      otherwise: (schema) => schema.strip(),
    }),
  title: string()
    .required()
    .test("unique-name", "Title must be unique", function (value) {
      const existingTitles = this.options.context?.existingTitles || [];

      return !existingTitles.includes(value);
    }),
  images: array()
    .of(string().required())
    .min(1, "At least 1 image is required")
    .required(),
  url: string().required(),
});
