import {
  array,
  number,
  object,
  string,
  ValidationError,
} from "typed-contracts";

const postsData = object({
  data: object({
    page: number,
    posts: array(
      object({
        created_time: string,
        from_id: string,
        from_name: string,
        id: string,
        message: string,
        type: string,
      })
    ),
  }),
  meta: object({
    request_id: string,
  }),
});

const postsErrorData = object({
  meta: object({
    request_id: string,
  }),
  error: object({
    message: string,
  }),
});

export const postsDataValidate = postsData("posts data");
export type PostsData = Exclude<
  ReturnType<typeof postsDataValidate>,
  ValidationError
>;

export const postsErrorDataValidate = postsErrorData("posts error data");
