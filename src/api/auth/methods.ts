import { ValidationError } from "typed-contracts";
import {
  AuthData,
  registerDataValidate,
  registerErrorDataValidate,
} from "./contracts";

export const register = async ({ email, name }: AuthData) => {
  const url = `${process.env.REACT_APP_API_HOST}/assignment/register`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.REACT_APP_CLIENT_ID,
      email,
      name,
    }),
  });
  const data = await req.json();
  if (!req.ok) {
    const parsedError = registerErrorDataValidate(data);
    throw new Error(
      parsedError instanceof ValidationError
        ? "Validation error"
        : parsedError.error.message
    );
  }
  const validatedData = registerDataValidate(data);
  if (validatedData instanceof ValidationError) {
    throw new Error("Validation error");
  }
  return validatedData;
};
