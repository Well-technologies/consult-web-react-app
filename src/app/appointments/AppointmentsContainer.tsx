import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import clsx from "clsx";

import { useGetAllConsultations } from "@/api/consult/consult";
import { ServiceConfigType } from "@/api/index.types";
import { useClient } from "@/hooks/useClient/useClient";
import { Consultations } from "@/app/consultations/Consultations";
import { allReducerStates } from "@/store/store.utils";
import { StoreReducerStateTypes } from "@/store/store.types";
import { ConsultationsFilters } from "../consultations/consultationsFilters/ConsultationsFilters";
import { CreateAppointment } from "./createAppointment/CreateAppointment";
// import { CreateConsultation } from "../consultations/createConsultation/CreateConsultation";



export const AppointmentsContainer = () => {
  const { t } = useTranslation();
  const client = useClient({ serviceConfigType: ServiceConfigType.Consult });

  const { user } = useSelector((rootState) =>
    allReducerStates(rootState as StoreReducerStateTypes)
  );

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openFilter, setOpenFilter] = useState(false);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);

  const { register, setValue, control, watch, reset } = useForm({
    defaultValues: {
      claim_id: "",
      from_date: "",
      to_date: "",
      org_id: "",
      status: "",
      type: "",
    },
  });

  // const { from_date, to_date } = watch();


  const openAndCloseFilter = () => {
    setOpenFilter(!openFilter);
    if (openFilter) {
      reset();
    }
  };

  const {
    data: consultationsData,
    isLoading: isLoadingConsultations,
    refetch,
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
      ...watch(),
    },
  });

  return (
    <div className="flex flex-col p-2 gap-6">
      <div className="pb-0 flex flex-col border-2 border-gray-100 rounded-lg">
        <div className="flex p-4 flex-col md:flex-row gap-2 md:gap-0 md:items-center justify-between border-b-2 border-gray-100">
          <div className="text-lg font-bold">{t("appointments.table.title")}</div>
          <div className="flex gap-2 flex-col-reverse md:flex-row">
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
                          onClick={() => setIsCreatingAppointment(true)}
                          className="flex gap-2 cursor-pointer items-center justify-center md:justify-start rounded-lg px-4 py-2 bg-primary-600 text-white text-sm"
                        >
                          <img
                            className="w-4 invert"
                            src="https://img.icons8.com/ios-glyphs/30/plus-math.png"
                            alt="plus-math"
                          />
                          {t("consultation.create_consultation.button", {type: 'Appointment'})}
                        </button>
          </div>
        </div>
        <ConsultationsFilters
          openFilter={openFilter}
          register={register}
          setValue={setValue}
          control={control}
          myPatients={[]}
          myPatientsOptions={[]}
        />
        {isCreatingAppointment ? 
                <CreateAppointment 
                  isCreatingAppointment={isCreatingAppointment} 
                  setIsCreatingAppointment={setIsCreatingAppointment} 
                  refetch={refetch}
                  myPatients={[]} // Optional: Add patients summary if needed
                 /> :
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
                }
      </div>
    </div>
  );
};
