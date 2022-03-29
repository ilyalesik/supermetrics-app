import renderer from "react-test-renderer";
import React from "react";
import { LoginPage } from "./index";

it("renders LoginPage", () => {
  const tree = renderer
    .create(
      <LoginPage>
        <div>form</div>
      </LoginPage>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
