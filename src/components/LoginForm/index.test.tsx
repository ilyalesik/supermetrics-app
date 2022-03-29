import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "./index";

it("renders LoginForm", () => {
  const tree = renderer.create(<LoginForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders LoginForm error", () => {
  const tree = renderer
    .create(<LoginForm error={new Error("Error")} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders LoginForm isLoading", () => {
  const tree = renderer.create(<LoginForm isLoading />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("LoginForm onSubmit works", () => {
  const onSubmit = jest.fn();
  render(<LoginForm onSubmit={onSubmit} />);
  fireEvent.input(screen.getByLabelText("name-input"), {
    target: { value: "John Doe" },
  });
  fireEvent.input(screen.getByLabelText("email-input"), {
    target: { value: "johndoe@example.com" },
  });
  fireEvent.click(screen.getByLabelText("submit-button"));
  expect(onSubmit.mock.calls.length).toBe(1);
  expect(onSubmit.mock.calls[0][0]).toMatchObject({
    name: "John Doe",
    email: "johndoe@example.com",
  });
});
