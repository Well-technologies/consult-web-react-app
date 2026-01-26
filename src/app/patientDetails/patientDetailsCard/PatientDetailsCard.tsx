import clsx from "clsx";

import EmailIcon from "@/assets/icons/email_icon.png";
import PhoneIcon from "@/assets/icons/phone_icon.png";
import AgeIcon from "@/assets/icons/time.png";
import GenderIcon from "@/assets/icons/gender.png";
import { Avatar } from "@/ui/atoms/avatar/Avatar";

import { PatientDetailsCardProps } from "./PatientDetailsCard.types";
import { calculateAge } from "@/utils/ageCalculator.utils";

export const PatientDetailsCard = ({
  data,
  isLoading,
  // onOpenUserModal,
  // onOpenFamilyModal,
  // claimFeatures,
}: PatientDetailsCardProps) => {

  console.log('PatientDetailsCard', data)
  const {  name, profilePicture, phoneNumber, email, dob, gender} = 
    data || {};



  return (
    <div
      className={clsx(
        "flex flex-col bg-white gap-1 justify-center border-1 border-gray-100 rounded-lg shadow-xs p-6",
        isLoading ? "animate-pulse" : ""
      )}
    >
      <div className="flex gap-2 items-center">
        <Avatar
          imageUrl={profilePicture || undefined}
          className={clsx(
            "w-12 h-12 sm:h-20 sm:w-20 aspect-square",
            isLoading ? "bg-gray-200" : ""
          )}
        />
        <div className="flex flex-col gap-1">
          <div
            className={clsx(
              "text-base sm:text-lg text-secondary font-bold",
              isLoading ? "h-6 w-32 bg-gray-200 rounded" : ""
            )}
          >
            {name}
          </div>
          <div className="flex  gap-1 items-center">
            <img
              src={PhoneIcon}
              className="h-3.5 aspect-square"
              alt="phoneIcon"
            />
            <div
              className={clsx(
                "text-xs sm:text-sm text-secondary font-medium",
                isLoading ? "h-5 w-24 bg-gray-200 rounded" : ""
              )}
            >
              {phoneNumber || ""}
            </div>
          </div>
          <div className="flex gap-1.5 items-center">
            <img
              src={EmailIcon}
              className="h-3.5 aspect-square"
              alt="emailIcon"
            />
            <div
              className={clsx(
                "text-xs sm:text-sm text-secondary truncate font-medium",
                isLoading ? "h-5 w-40 bg-gray-200 rounded" : ""
              )}
            >
              {email || ""}
            </div>
          </div>
          {dob && <div className="flex gap-1.5 items-center">
            <img
              src={AgeIcon}
              className="h-4 aspect-square"
              alt="emailIcon"
            />
            <div
              className={clsx(
                "text-xs sm:text-sm text-secondary truncate font-medium",
                isLoading ? "h-5 w-40 bg-gray-200 rounded" : ""
              )}
            >
              {calculateAge(dob)}
            </div>
          </div>}
          {gender && <div className="flex gap-1.5 items-center">
            <img
              src={GenderIcon}
              className="h-4 aspect-square"
              alt="emailIcon"
            />
            <div
              className={clsx(
                "text-xs sm:text-sm text-secondary truncate font-medium",
                isLoading ? "h-5 w-40 bg-gray-200 rounded" : ""
              )}
            >
              {gender}
            </div>
          </div>}
        </div>
      </div>
      {/* <div className="h-0.5 bg-gray-100 mt-2 w-full" /> */}
      {/* <div className="mt-2 flex gap-2 justify-end">
        {claimFeatures?.talkFamily ? (
          <button
            disabled={isLoading}
            className={clsx(
              "py-2 px-4 text-xs sm:text-sm cursor-pointer text-white rounded-lg",
              isLoading ? "bg-gray-200!" : "bg-primary "
            )}
            onClick={() => onOpenFamilyModal(null, FormType.Add)}
          >
            {t("employee.details.addFamily")}
          </button>
        ) : null}
        <button
          disabled={isLoading}
          className={clsx(
            "py-2 px-4 text-xs sm:text-sm cursor-pointer text-white rounded-lg",
            isLoading ? "bg-gray-200!" : "bg-primary "
          )}
          onClick={() =>
            employeeData?.lead &&
            onOpenUserModal(employeeData?.lead, FormType.Edit)
          }
        >
          {t("employee.details.edit")}
        </button>
      </div> */}
    </div>
  );
};
