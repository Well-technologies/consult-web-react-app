import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface ConsultationHeaderProps {
  isCreatingConsultation: boolean;
  openFilter: boolean;
  openAndCloseFilter: () => void;
  setIsCreatingConsultation: (value: boolean) => void;
}

export const ConsultationHeader = ({
  isCreatingConsultation,
  openFilter,
  openAndCloseFilter,
  setIsCreatingConsultation,
}: ConsultationHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex p-4 flex-col md:flex-row gap-2 md:gap-0 md:items-center justify-between border-b-2 border-gray-100">
      <div className="text-lg font-bold">{t("consultation.table.title")}</div>
      <div className="flex gap-2 flex-col-reverse md:flex-row">
        {!isCreatingConsultation && (
          <button
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
            {t("global.text.filter")}
          </button>
        )}
        {!isCreatingConsultation && (
          <button
            onClick={() => setIsCreatingConsultation(true)}
            className="flex gap-2 cursor-pointer items-center justify-center md:justify-start rounded-lg px-4 py-2 bg-primary-600 text-white text-sm"
          >
            <img
              className="w-4 invert"
              src="https://img.icons8.com/ios-glyphs/30/plus-math.png"
              alt="plus-math"
            />
            {t("consultation.create_consultation.button", {
              type: "Consultation",
            })}
          </button>
        )}
      </div>
    </div>
  );
};
