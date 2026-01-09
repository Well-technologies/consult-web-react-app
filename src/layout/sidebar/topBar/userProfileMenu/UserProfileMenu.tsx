import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { onLogOutAction } from "@/store/authReducer/authReducer";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";
import { onRemoveUserDetails } from "@/store/userReducer/userReducer";
import { Avatar } from "@/ui/atoms/avatar/Avatar";
import { Version } from "@/ui/molecules/Version/Version";

export const UserProfileMenu = () => {
  const { t } = useTranslation();

  const { name, email, profile_picture_url } = useSelector(
    (rootState) =>
      allReducerStates(rootState as StoreReducerStateTypes).user.profile
  );

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(onLogOutAction());
    dispatch(onRemoveUserDetails());
  };

  const onClickFAQ = () => {
    console.log("onClickFAQ");
  };

  return (
    <div className="flex flex-col ">
      <div
        id="profileSection"
        className="flex gap-2 items-center w-full px-2 py-2"
      >
        <Avatar className="w-10" imageUrl={profile_picture_url || undefined} />
        <div className="flex flex-col">
          <p className="text-sm text-secondary font-bold">{name}</p>
          <p className="text-xs text-secondary-400 font-semibold">{email}</p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-secondary-50 my-2" />
      <div
        id="actionSection"
        className="flex flex-col gap-1 items-start w-full"
      >
        <button
          onClick={onClickFAQ}
          className="flex gap-2 font-bold text-sm py-1 px-2 text-secondary w-full text-start rounded-lg hover:bg-secondary-50"
        >
          {t("userMenu.faq")}
        </button>
        <button
          onClick={onLogout}
          className="flex gap-2 cursor-pointer font-bold text-sm py-1 px-2 text-secondary w-full text-start rounded-lg hover:bg-secondary-50"
        >
          {t("userMenu.logOut")}
        </button>
      </div>
      <Version className="text-center mt-1" />
    </div>
  );
};
