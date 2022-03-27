import React from "react";
import "./index.css";

export const LoginForm = ({
  onSubmit,
}: {
  onSubmit?: (value: { name: string; email: string }) => void;
}) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <form
      className="login-form-container"
      onSubmit={() => {
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="login-form-footer">
        <button className="login-form-button" type="submit">
          Go
        </button>
      </div>
    </form>
  );
};
