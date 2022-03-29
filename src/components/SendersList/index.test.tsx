import React from "react";
import renderer from "react-test-renderer";
import { SendersList } from "./index";

it("renders SendersList", () => {
  const tree = renderer
    .create(
      <SendersList
        items={[
          {
            from_id: "user_1",
            from_name: "Filomena Cort",
            count: 2,
          },
          {
            from_id: "user_3",
            from_name: "Filomena Cort 2",
            count: 3,
          },
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
