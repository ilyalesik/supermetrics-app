import { createEffect, createEvent, createStore, restore } from "effector";
import connectLocalStorage from "effector-localstorage";
import { AuthData, register } from "../../api/auth";

// Auth events
export const login = createEvent<AuthData>();
export const logout = createEvent();

const registerEffect = createEffect(register);
login.watch((authData) => registerEffect(authData));

// SL token storage
const tokenLocalStorage = connectLocalStorage("token");
export const $token = createStore<string | null>(tokenLocalStorage.init(null));
$token.on(registerEffect.done, (_, value) => {
  if (value.result) {
    return value.result.data.sl_token;
  }
  return null;
});
$token.on(registerEffect.fail, () => {
  return null;
});
$token.on(logout, () => null);
$token.watch(tokenLocalStorage);

// Auth state
export const $isAuthorized = $token.map((state) => !!state);
export const $isLoading = registerEffect.pending;
export const $fail = restore(registerEffect.fail, null);
