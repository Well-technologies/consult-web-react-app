import { useState } from "react";
import { useLocation } from "react-router-dom";

import { useGetConsultations } from "@/api/consult/consult";
import { ServiceConfigType } from "@/api/index.types";
import { useClient } from "@/hooks/useClient/useClient";
import { AppRoute } from "@/routing/AppRoute.enum";

import { Consultations } from "./Consultations";
import { allReducerStates } from "@/store/store.utils";
import { useSelector } from "react-redux";
import { StoreReducerStateTypes } from "@/store/store.types";
import { useTranslation } from "react-i18next";

export const ConsultationsContainer = () => {
  const { t } = useTranslation();
  const client = useClient({ serviceConfigType: ServiceConfigType.Consult });
  const location = useLocation();

  const { user, config , auth } = useSelector(
    (rootState) =>
      allReducerStates(rootState as StoreReducerStateTypes)
  );

  console.log(user);
  console.log(config);
  console.log(auth);

  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Determine which columns to show based on the route
  const isConsultationsRoute = location.pathname === AppRoute.Consultations;
  const isPatientDetailsRoute = location.pathname.includes('/patients/');

  const {
    data: consultationsData,
    isLoading: isLoadingConsultations,
  } = useGetConsultations({
    client,
    params: {
      page,
      take: pageSize,
      doctor: user?.userDetails.consult_user_id,
    },
  });

  return (
    <div className="flex flex-col p-2 gap-6">
          <div className="pb-0 flex flex-col border-2 border-gray-100 rounded-lg">
            <div className="flex p-4 flex-col md:flex-row gap-2 md:gap-0 md:items-center justify-between border-b-2 border-gray-100">
              <div className="text-lg font-bold">{t("consultation.table.title")}</div>
              {/* <div className="flex gap-2 flex-col-reverse md:flex-row">
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
                <button
                  onClick={() => openAddNewModal(null, FormType.Add)}
                  className="flex gap-2 cursor-pointer items-center justify-center md:justify-start rounded-lg px-4 py-2 bg-primary-600 text-white text-sm"
                >
                  <img
                    className="w-4 invert"
                    src="https://img.icons8.com/ios-glyphs/30/plus-math.png"
                    alt="plus-math"
                  />
                  {t("patient.new_user.button")}
                </button>
              </div> */}
            </div>
    <Consultations
      data={consultationsData?.payload}
      meta={consultationsData?.meta}
      isLoading={isLoadingConsultations}
      isConsultationsRoute={isConsultationsRoute}
      isPatientDetailsRoute={isPatientDetailsRoute}
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
    />
    </div>
    </div>
  );
};
