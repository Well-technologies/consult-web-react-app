import { TFunction } from "i18next";
import { Lead } from "@/api/user/user.types";
import { UsersDataProps } from "../UsersData.types";
export type UserDataCardProps = Pick<UsersDataProps, "openAddNewModal"> & {
    data: Lead;
};
export type GetCardViewActionOptionsProps = UserDataCardProps & {
    translate: TFunction<"translation", undefined>;
};
