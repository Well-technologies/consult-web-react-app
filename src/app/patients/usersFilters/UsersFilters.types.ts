import { UsersProps } from "../usersData/UsersData.types";

export type UsersFiltersProps = Pick<
  UsersProps, "openFilter"
> & {
  searchText: string;
  setSearchText: (text: string) => void;
};
