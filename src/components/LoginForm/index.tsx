import React from "react";
import "./index.css";
import { useStore } from "effector-react";
import { $fail, $isLoading, login } from "../../stores/auth";

export const LoginForm = ({
  error,
  isLoading,
  onSubmit,
}: {
  error?: Error;
  isLoading?: boolean;
  onSubmit?: (value: { name: string; email: string }) => void;
}) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <form
      className="login-form-container"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit &&
          onSubmit({
            name,
            email,
          });
      }}
    >
      <div className="login-form-header">
        <p>Login</p>
      </div>

      <div>
        <label className="login-form-label" htmlFor="name">
          Name
        </label>
        <input
          className="login-form-input"
          aria-label="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="login-form-label" htmlFor="name">
          Email
        </label>
        <input
          className="login-form-input"
          aria-label="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && (
        <div>
          <p className="login-form-error-message">Error: {error.message}</p>
        </div>
      )}

      <div className="login-form-footer">
        <button
          disabled={isLoading}
          className="login-form-button"
          type="submit"
          aria-label="submit-button"
        >
          Go
        </button>
      </div>
    </form>
  );
};

const LoginFormConnected = () => {
  const isLoading = useStore($isLoading);
  const fail = useStore($fail);

  return (
    <LoginForm
      error={(fail && fail.error) || undefined}
      isLoading={isLoading}
      onSubmit={login}
    />
  );
};

export default LoginFormConnected;
