import React from "react";
import renderer from "react-test-renderer";
import { PostsList } from "./index";

it("renders PostsList", () => {
  const tree = renderer
    .create(
      <PostsList
        items={[
          {
            created_time: "2022-03-28T19:06:39+00:00",
            from_id: "user_1",
            from_name: "Filomena Cort",
            id: "post624236da322ce_86ec7f87",
            message:
              "protection racism mood contrary pavement drama sample manufacture printer",
            type: "status",
          },
          {
            created_time: "2022-03-28T13:32:35+00:00",
            from_id: "user_1",
            from_name: "Filomena Cort",
            id: "post624236da322d9_dbc2eea1",
            message:
              "plane falsify rear admit difficulty dorm core thin flat wrestle reputation beer syndrome reliance mail tumour intermediate speech recommendation linen combine move mug fling facade wrist wagon buy permission test leave dynamic expertise",
            type: "status",
          },
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
