import renderer from "react-test-renderer";
import React from "react";
import { DashboardPage } from "./index";

it("renders DashboardPage", () => {
  const tree = renderer
    .create(
      <DashboardPage
        senders={<div>senders</div>}
        posts={<div>posts</div>}
        navigation={<div>navigation</div>}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
