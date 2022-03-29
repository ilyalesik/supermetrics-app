import { createEffect, createEvent, createStore, restore } from "effector";
import { AuthData, register } from "../../api/auth";

// Auth events
export const login = createEvent<AuthData>();
export const logout = createEvent();

const registerEffect = createEffect(register);
login.watch((authData) => registerEffect(authData));

// SL token storage
export const $clientId = createStore<string | null>(null);
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

// Auth state
export const $isAuthorized = $clientId.map((state) => !!state);
export const $isLoading = registerEffect.pending;
export const $fail = restore(registerEffect.fail, null);
