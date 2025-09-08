import { useState } from "react";
import { useSelector } from "react-redux";

import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";
import { Avatar } from "@/ui/atoms/avatar/Avatar";
import { PopupMenu } from "@/ui/atoms/popupMenu/PopupMenu";

import { UserProfileMenu } from "../userProfileMenu/UserProfileMenu";

export const TopBarActions = () => {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const { profilePictureUrl } = useSelector(
    (rootState) =>
      allReducerStates(rootState as StoreReducerStateTypes).user.userDetails
  );

  return (
    <PopupMenu
      onClose={() => setOpenProfileMenu(false)}
      open={openProfileMenu}
      component={<UserProfileMenu />}
      componentClassName="top-10 right-0 text-sm"
    >
      <div className="flex relative flex-row-reverse gap-3">
        <button
          onClick={() => setOpenProfileMenu(true)}
          className="flex gap-2 items-center cursor-pointer relative px-2"
        >
          <Avatar
            className="h-full"
            imageUrl={profilePictureUrl || undefined}
          />
          {/* <p className="text-sm text-secondary font-semibold">{name}</p> */}
        </button>
      </div>
    </PopupMenu>
  );
};
