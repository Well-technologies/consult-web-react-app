import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { CalendarIcon } from "@/assets/icons/customIcons/CalendarIcon";
import EmailIcon from "@/assets/icons/email_icon.png";
import PhoneIcon from "@/assets/icons/phone_icon.png";
import ThreeDotsIcon from "@/assets/icons/threeDots.svg";
import { PopupMenu } from "@/ui/atoms/popupMenu/PopupMenu";
import { CardViewActions } from "@/ui/molecules/CardViewActions/CardViewActions";
import { convertISOToDateTime } from "@/utils/timeConvertor.utils";

import { getCSSAndStatusFromStatus } from "../UsersData.utils";
import { UserDataCardProps } from "./UserDataCard.types";
import { getCardViewActionOptions } from "./UserDataCard.utils";

const UserDataCard = ({ data, ...props }: UserDataCardProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { t } = useTranslation();
  const actionOptions = getCardViewActionOptions({
    data,
    translate: t,
    ...props,
  });
  const { css, statusName } = getCSSAndStatusFromStatus(data);
  // const { subCompanies, ...parent } = useSelector(
  //   (rootState) =>
  //     allReducerStates(rootState as StoreReducerStateTypes).user.companyDetails
  // );

  // const packageName =
  //   [...subCompanies, parent].find((item) => item.id === data.organization_id)
  //     ?.companyName || "";

  return (
    <div className="flex flex-col shadow-sm rounded-lg">
      <div className="flex flex-row gap-4 bg-secondary-50 py-2 px-4 rounded-t-lg">
        <div className="flex flex-col justify-center w-full overflow-hidden">
          <p className="text-xs sm:text-sm text-secondary font-bold mb-1 truncate">
            {data.name}
          </p>
          <div className="flex flex-row items-center">
            <img src={PhoneIcon} alt="" className="size-3 me-1" />
            <div className="text-xs text-gray-400 break-all">
              {data.mobile_no}
            </div>
          </div>
          <div className="flex flex-row items-center">
            <img src={EmailIcon} alt="" className="size-3 me-1.5 mt-0.5" />
            <div className="text-xs text-gray-400 break-all">{data.email}</div>
          </div>
          <div className="flex flex-row items-center">
            <CalendarIcon className="size-3 me-1.5 mt-0.5" />
            <div className="text-xs text-gray-400 mt-0.5">
              {convertISOToDateTime(
                data.created_at,
                // DateFormatOptionType.MonthDayYear
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={clsx(
              "flex w-auto text-center rounded-2xl text-xs font-medium py-1 px-2",
              css
            )}
          >
            {statusName}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between bg-gray-50 rounded-b-lg p-2 pl-4">
        {/* <div className="flex w-auto text-center rounded-2xl text-xs font-medium bg-secondary text-white px-3 py-1">
          {packageName}
        </div> */}
        <PopupMenu
          componentClassName="bottom-full right-0"
          onClose={() => setOpenMenu(false)}
          open={openMenu}
          component={<CardViewActions options={actionOptions} />}
        >
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex px-2 items-center justify-center cursor-pointer"
          >
            <img src={ThreeDotsIcon} alt="dotsIcon" className="h-fit" />
          </button>
        </PopupMenu>
      </div>
    </div>
  );
};

export default UserDataCard;
