import React from "react";
import renderer from "react-test-renderer";
import { PostsNavigation } from "./index";
import { fireEvent, render, screen } from "@testing-library/react";

it("renders PostsNavigation", () => {
  const tree = renderer
    .create(<PostsNavigation onAsc={console.log} onDesc={console.log} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("PostsNavigation onAsc/onDesc works", () => {
  const onAsc = jest.fn();
  const onDesc = jest.fn();
  render(<PostsNavigation onAsc={onAsc} onDesc={onDesc} />);
  fireEvent.click(screen.getByLabelText("asc-button"));
  fireEvent.click(screen.getByLabelText("desc-button"));
  expect(onAsc.mock.calls.length).toBe(1);
  expect(onDesc.mock.calls.length).toBe(1);
});
