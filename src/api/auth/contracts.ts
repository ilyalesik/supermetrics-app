import { object, string } from "typed-contracts";

export interface AuthData {
  email: string;
  name: string;
}

const registerData = object({
  meta: object({
    request_id: string,
  }),
  data: object({
    client_id: string,
    email: string,
    sl_token: string,
  }),
});

const registerErrorData = object({
  meta: object({
    request_id: string,
  }),
  error: object({
    message: string,
  }),
});

export const registerDataValidate = registerData("register data");

export const registerErrorDataValidate = registerErrorData(
  "register error data"
);
