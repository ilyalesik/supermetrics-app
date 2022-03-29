import { createEffect, createEvent, createStore, restore } from "effector";
import connectLocalStorage from "effector-localstorage";
import { AuthData, register } from "../../api/auth";

// Auth events
export const login = createEvent<AuthData>();
export const logout = createEvent();

const registerEffect = createEffect(register);
login.watch((authData) => registerEffect(authData));

// SL token storage
const clientIdLocalStorage = connectLocalStorage("counter");
export const $clientId = createStore<string | null>(
  clientIdLocalStorage.init(null)
);
$clientId.on(registerEffect.done, (_, value) => {
  if (value.result) {
    return value.result.data.sl_token;
  }
  return null;
});
$clientId.on(registerEffect.fail, () => {
  return null;
});
$clientId.on(logout, () => null);
$clientId.watch(clientIdLocalStorage);

// Auth state
export const $isAuthorized = $clientId.map((state) => !!state);
export const $isLoading = registerEffect.pending;
export const $fail = restore(registerEffect.fail, null);
