import { UsersProps } from "../Users.types";

export type UsersFiltersProps = Pick<
  UsersProps,
  "register" | "control" | "openFilter" | "setValue" | "watch"
>;
