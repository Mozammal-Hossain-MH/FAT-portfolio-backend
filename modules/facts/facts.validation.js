import { object, string } from "yup";

const factsSchema = object({
  Icon: string().required(),
  name: string().required(),
  value: string().required(),
});

export default factsSchema;
