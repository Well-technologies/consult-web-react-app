import { UsersProps } from "../usersData/UsersData.types";

export type UsersFiltersProps = Pick<
  UsersProps,
  "register" | "control" | "openFilter" | "setValue" | "watch"
>;
