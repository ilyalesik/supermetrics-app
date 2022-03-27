import { createEffect, createEvent, createStore, restore } from "effector";
import { object, string, ValidationError } from "typed-contracts";

interface AuthData {
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

const registerDataValidate = registerData("register data");

const registerErrorDataValidate = registerErrorData("register error data");

export const login = createEvent<AuthData>();

export const logout = createEvent();

const registerEffect = createEffect(async ({ email, name }: AuthData) => {
  const url = `https://api.supermetrics.com/assignment/register`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: "ju16a6m81mhid5ue1z3v2g0uh",
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
});

login.watch((authData) => registerEffect(authData));

export const $clientId = createStore<string | null>("");

$clientId.on(registerEffect.done, (_, value) => {
  if (value.result) {
    return value.result.data.sl_token;
  }
});

$clientId.on(logout, () => null);

export const $isAuthorized = $clientId.map((state) => !!state);

export const $isLoading = registerEffect.pending;

export const $fail = restore(registerEffect.fail, null);
