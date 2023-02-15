import { object, string } from "yup";
import { AuthorithationBody } from "../models/User/User.query.models";

export const accountCredentialsValidator = object<AuthorithationBody>().shape({
  email: string().email().required(),
  password: string().min(4).max(32).required(),
});

export const verificationValidator = object<AuthorithationBody>().shape({
  email: string().email().required(),
  code: string().length(5).required()
});

export const emailValidator = object<AuthorithationBody>().shape({
  email: string().email().required(),
});

export const passwordValidator = object<AuthorithationBody>().shape({
  password: string().min(4).max(32).required(),
});
