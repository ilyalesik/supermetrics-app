import { $token, $fail, $isAuthorized, $isLoading, login } from "./index";
import { timeout } from "../../utils/timeout";

beforeAll(() => jest.spyOn(window, "fetch"));

it("login successfully", async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.fetch.mockImplementation((url) => {
    if (url !== `${process.env.REACT_APP_API_HOST}/assignment/register`) {
      return;
    }
    return {
      ok: true,
      json: async () => ({
        meta: {
          request_id: "1",
        },
        data: {
          client_id: "1",
          email: "johndoe@example.com",
          sl_token: "12345",
        },
      }),
    };
  });

  login({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  await timeout();

  expect($token.getState()).toBe("12345");
  expect($isAuthorized.getState()).toBeTruthy();
  expect($isLoading.getState()).toBeFalsy();
  expect($fail.getState()).toBeFalsy();
});

it("login failure", async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.fetch.mockImplementation((url) => {
    if (url !== `${process.env.REACT_APP_API_HOST}/assignment/register`) {
      return;
    }
    return {
      ok: false,
      json: async () => ({
        meta: {
          request_id: "1",
        },
        error: {
          message: "Wrong token",
        },
      }),
    };
  });

  login({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  await timeout();

  expect($token.getState()).toBe(null);
  expect($isAuthorized.getState()).toBeFalsy();
  expect($isLoading.getState()).toBeFalsy();
  expect($fail.getState()?.error.message).toBe("Wrong token");
});
