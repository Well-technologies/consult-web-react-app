import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useGetAllConsultations } from "@/api/consult/consult";
import { ServiceConfigType } from "@/api/index.types";
import { useClient } from "@/hooks/useClient/useClient";
import { Consultations } from "@/app/consultations/Consultations";
import { allReducerStates } from "@/store/store.utils";
import { StoreReducerStateTypes } from "@/store/store.types";

export const AppointmentsContainer = () => {
  const { t } = useTranslation();
  const client = useClient({ serviceConfigType: ServiceConfigType.Consult });

  const { user } = useSelector((rootState) =>
    allReducerStates(rootState as StoreReducerStateTypes)
  );

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: consultationsData,
    isLoading: isLoadingConsultations,
  } = useGetAllConsultations(
  {
    client,
    params: {
      page,
      take: pageSize,
      doctor: user?.userDetails.consult_user_id || "",
      appointmentType: "BOOKING",
      scheduleType: "upcoming",
      orderBy: "appointmentDate",
      orderType: "DESC",
    },
  });

  return (
    <div className="flex flex-col p-2 gap-6">
      <div className="pb-0 flex flex-col border-2 border-gray-100 rounded-lg">
        <div className="flex p-4 flex-col md:flex-row gap-2 md:gap-0 md:items-center justify-between border-b-2 border-gray-100">
          <div className="text-lg font-bold">{t("appointments.table.title")}</div>
        </div>
        <Consultations
          data={consultationsData?.payload}
          meta={consultationsData?.meta}
          isLoading={isLoadingConsultations}
          isConsultationsRoute={true}
          isPatientDetailsRoute={false}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};
