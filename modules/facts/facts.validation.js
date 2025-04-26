import { mixed, object, string } from "yup";

export const factsSchema = object({
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
  Icon: string().required(),
  name: string()
    .required()
    .test("unique-name", "Name must be unique", function (value) {
      const existingNames = this.options.context?.existingNames || [];

      return !existingNames.includes(value);
    }),
  value: string().required(),
});
