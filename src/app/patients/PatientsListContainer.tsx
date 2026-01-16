import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";

import {
  useGetMyPatients,
  useSearchPatients,
} from "../../api/patient/patient";
import { CommonPaginationParams, ServiceConfigType } from "@/api/index.types";
import { useClient } from "@/hooks/useClient/useClient";
import { AppRoute } from "@/routing/AppRoute.enum";
import { FormType } from "@/types";

import { PatientList } from "./PatientsList";
import { PatientDetails } from "@/api/patient/patient.types";
import { AddPatientModalContainer } from "./addPatientModal/AddPatientModalContainer";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";
import { useSelector } from "react-redux";
import { sortByDate } from "./PatientsList.utils";

export const PatientsListContainer = () => {
  const client = useClient({ serviceConfigType: ServiceConfigType.Core });

  const leadId = useParams<'patientId'>();
  if (!leadId) return <Navigate to={AppRoute.Patients} replace />;

  const [openFilter, setOpenFilter] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [openUserModal, setOpenUserModal] = useState<{
    data: PatientDetails | null;
    formType: FormType;
  } | null>(null);

  const { userDetail: { id: doctor_id } } = useSelector(
    (rootState) =>
      allReducerStates(rootState as StoreReducerStateTypes).user.profile
  );

  const patientFrom = useForm<CommonPaginationParams>({
    shouldUnregister: false,
    defaultValues: {
      page: 1,
      page_size: 10,
    },
  });

  const openAndCloseFilter = () => {
    setOpenFilter(!openFilter);
    if (openFilter) {
      patientFrom.reset({
        page: 1,
        page_size: 10,
      });
    }
  };

  const onOpenUserModal = (
    data: PatientDetails | null,
    formType: FormType
  ) => {
    setOpenUserModal({
      formType: formType,
      data: data || null,
    });
  };

  const {
    data: searchPatientsData,
    isLoading: isLoadingSearchPatientsData,
    refetch: refetchSearchPatientsData,
  } = useSearchPatients({
    client,
    params: {
      patient: searchText
    },
    enabled: false
  });

  const {
    data: patientsData,
    isLoading: isLoadingPatientsData,
    refetch,
  } = useGetMyPatients({
    client,
    params: {
      doctor_id,
      page: 1,
      page_size: 10,
    }
  });

  const [filteredPatientsData, setFilteredPatientsData] = useState<PatientDetails[]>([]);

  useEffect(() => {
    setTimeout(() => {
      refetchSearchPatientsData();
      setFilteredPatientsData(searchPatientsData?.data?.map((searchedPatient) => {
        if (patientsData?.data.map((patient) => patient.id).includes(searchedPatient.id)) {
          return {
            ...searchedPatient,
            isDisabled: false,
          };
        } else {
          return {
            ...searchedPatient,
            isDisabled: true,
          };
        }
      }) || []);
      setIsSearching(false)
    }, 500);
  }, [searchText, searchPatientsData?.data?.length]);

  return (
    <>
      <PatientList
        data={sortByDate(searchText ? filteredPatientsData || [] : patientsData?.data || [], false, 'updated_at')}
        isLoading={isLoadingPatientsData || isLoadingSearchPatientsData || isSearching}
        openAddNewModal={onOpenUserModal}
        openFilter={openFilter}
        searchText={searchText}
        setSearchText={setSearchText}
        openAndCloseFilter={openAndCloseFilter}

      />
      {openUserModal && (
        <AddPatientModalContainer
          refetch={refetch}
          open={!!openUserModal}
          onClose={() => setOpenUserModal(null)}
          setSearchText={setSearchText}
          {...openUserModal}
        />
      )}
    </>
  );
};
