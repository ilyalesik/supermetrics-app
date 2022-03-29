import { ValidationError } from "typed-contracts";
import { postsDataValidate, postsErrorDataValidate } from "./contracts";

export const getPosts = async ({
  clientId,
  page,
}: {
  clientId: string | null;
  page?: number;
}) => {
  const url = `${process.env.REACT_APP_API_HOST}/assignment/posts?sl_token=${clientId}&page=${page}`;
  const req = await fetch(url);
  const data = await req.json();

  if (!req.ok) {
    const parsedError = postsErrorDataValidate(data);
    throw new Error(
      parsedError instanceof ValidationError
        ? "Validation error"
        : parsedError.error.message
    );
  }
  const validatedData = postsDataValidate(data);
  if (validatedData instanceof ValidationError) {
    throw new Error("Validation error");
  }
  return validatedData.data;
};
