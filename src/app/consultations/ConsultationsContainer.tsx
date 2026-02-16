import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  useGetConsultations,
  useGetPatientsSummary,
} from "@/api/consult/consult";
import { ServiceConfigType } from "@/api/index.types";
import { useClient } from "@/hooks/useClient/useClient";
import { AppRoute } from "@/routing/AppRoute.enum";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";

import { ConsultationHeader } from "./ConsultationHeader";
import { Consultations } from "./Consultations";
import { ConsultationsFilters } from "./consultationsFilters/ConsultationsFilters";
import { CreateConsultation } from "./createConsultation/CreateConsultation";

export const ConsultationsContainer = () => {
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });
  const location = useLocation();

  const { user } = useSelector((rootState) =>
    allReducerStates(rootState as StoreReducerStateTypes)
  );

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openFilter, setOpenFilter] = useState(false);
  const [isCreatingConsultation, setIsCreatingConsultation] = useState(false);

  const { register, setValue, control, watch, reset } = useForm({
    defaultValues: {
      patient: "",
      start: "",
      end: "",
    },
  });

  const openAndCloseFilter = () => {
    setOpenFilter(!openFilter);
    if (openFilter) {
      reset();
    }
  };

  // Determine which columns to show based on the route
  const isConsultationsRoute = location.pathname === AppRoute.Consultations;
  const isPatientDetailsRoute = location.pathname.includes("/patients/");

  const { data: consultationsData, isLoading: isLoadingConsultations } =
    useGetConsultations({
      client: consultClient,
      params: {
        page,
        take: pageSize,
        doctor: user?.userDetails.consult_user_id,
        ...(watch().patient && { patient: watch().patient }),
        ...(watch().start && { start: watch().start }),
        ...(watch().end && { end: watch().end }),
      },
    });

  const { data: patientsSummaryData } = useGetPatientsSummary({
    client: consultClient,
    doctorId: user?.userDetails.consult_user_id,
    options: {
      enabled: !!user?.userDetails.consult_user_id,
    },
  });

  const refetch = () => {
    console.log("refetch");
  };

  return (
    <div className="flex flex-col p-2 gap-6">
      <div className="pb-0 flex flex-col border-2 border-gray-100 rounded-lg">
        <ConsultationHeader
          isCreatingConsultation={isCreatingConsultation}
          openFilter={openFilter}
          openAndCloseFilter={openAndCloseFilter}
          setIsCreatingConsultation={setIsCreatingConsultation}
        />
        <ConsultationsFilters
          openFilter={openFilter}
          register={register}
          setValue={setValue}
          control={control}
          myPatients={
            patientsSummaryData?.payload?.map((item) => {
              return {
                value: item.patientId,
                label: item.patientName,
              };
            }) || []
          }
          myPatientsOptions={
            patientsSummaryData?.payload?.map((item) => {
              return {
                value: item.patientId,
                label: item.patientName,
              };
            }) || []
          }
        />

        {isCreatingConsultation ? (
          <CreateConsultation
            isCreatingConsultation={isCreatingConsultation}
            setIsCreatingConsultation={setIsCreatingConsultation}
            // cancelButtonText="Cancel"
            // confirmButtonText="Create"
            refetch={refetch}
            myPatients={
              patientsSummaryData?.payload?.map((item) => {
                return {
                  value: item.patientId,
                  label: item.patientName,
                };
              }) || []
            }
          />
        ) : (
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
        )}
      </div>
    </div>
  );
};
