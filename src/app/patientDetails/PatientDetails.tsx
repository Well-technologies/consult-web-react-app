import clsx from "clsx";
import { useTranslation } from "react-i18next";


import { PatientDetailsProps, PatientsListProps } from "./PatientDetails.types";
import { UsersData } from "../patients/usersData/UsersData";
// import { UsersData } from "./usersData/UsersData";

export const PatientDetails = ({
  // openAddNewModal,
  data,
  consultations,
  // openFilter,
  isLoading,
  // openAndCloseFilter,
  ...props
}: PatientDetailsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col p-2 gap-6">
      <div className="pb-0 flex flex-col border-2 border-gray-100 rounded-lg">
        <div className="flex p-4 flex-col md:flex-row gap-2 md:gap-0 md:items-center justify-between border-b-2 border-gray-100">
          <div className="text-lg font-bold">{t("user.title")}</div>
          <div className="flex gap-2 flex-col-reverse md:flex-row">
            {/* <button
              onClick={() => openAndCloseFilter()}
              className={clsx(
                "flex gap-2 cursor-pointer items-center justify-center md:justify-start border-2 rounded-lg px-4 py-2 text-sm",
                openFilter
                  ? "text-white bg-secondary border-secondary"
                  : "text-secondary  border-secondary-100"
              )}
            >
              <img
                className={clsx("w-4", openFilter ? "invert-100" : "")}
                src="https://img.icons8.com/ios/50/horizontal-settings-mixer--v1.png"
                alt="horizontal-settings-mixer--v1"
              />
              {t("claim.filter.button")}
            </button> */}
            {/* <button
              onClick={() => openAddNewModal(null, FormType.Add)}
              className="flex gap-2 cursor-pointer items-center justify-center md:justify-start rounded-lg px-4 py-2 bg-primary-600 text-white text-sm"
            >
              <img
                className="w-4 invert"
                src="https://img.icons8.com/ios-glyphs/30/plus-math.png"
                alt="plus-math"
              />
              {t("user.newUser.button")}
            </button> */}
          </div>
        </div>
        {/* <UsersFilters openFilter={openFilter} {...props} /> */}
        {/* <UsersData 
        data={data}
        isLoading={isLoading}
        // openAddNewModal={openAddNewModal} 
        {...props} /> */}
      </div>
    </div>
  );
};
