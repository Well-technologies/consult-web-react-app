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
import { PatientDetails, UserDetails } from "@/api/patient/patient.types";
import { AddPatientModalContainer } from "./addPatientModal/AddPatientModalContainer";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";
import { useSelector } from "react-redux";
import { sortByDate } from "./PatientsList.utils";

export const PatientsListContainer = () => {
  const client = useClient({serviceConfigType: ServiceConfigType.Core});
  // const consultClient = useClient({serviceConfigType: ServiceConfigType.Consult});
  // const { t } = useTranslation();

  const  leadId  = useParams<'patientId'>();
  if (!leadId) return <Navigate to={AppRoute.Patients} replace />;

  const [openFilter, setOpenFilter] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [openUserModal, setOpenUserModal] = useState<{
    data: UserDetails | null;
    formType: FormType;
  } | null>(null);

  // const [openFamilyDeleteModal, setOpenFamilyDeleteModal] =
  //   useState<LeadFamily | null>(null);

  const { userDetail: {id: doctor_id} } = useSelector(
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
    data: UserDetails | null,
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
      // search: searchText
    }
  });

  const [filteredPatientsData, setFilteredPatientsData] = useState<PatientDetails[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      refetchSearchPatientsData();
      setFilteredPatientsData(searchPatientsData?.data?.map((searched_patient) => {
        if(patientsData?.data.map((patient) => patient.id).includes(searched_patient.id)) {
          return {
            ...searched_patient,
            isDisabled: false,
          };
        } else{
        return {
          ...searched_patient,
          isDisabled: true,
        };}
      }) || []);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);


  

  // const navigationOptions = getPatientDetailsBreadCrumbOptions();

  return (
    <>
      {/* <Breadcrumbs breadcrumbs={navigationOptions} /> */}
      <PatientList
      data={sortByDate(searchText ? filteredPatientsData || [] : patientsData?.data || [], false, 'created_at')}
      isLoading={isLoadingPatientsData || isLoadingSearchPatientsData}
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
          {...openUserModal}
        />
      )}

      {/* {!!openFamilyDeleteModal && (
        <DeleteConfirmModal
          open={!!openFamilyDeleteModal}
          confirmKey={FamilyDeleteConfirmKey}
          onClose={() => setOpenFamilyDeleteModal(null)}
          onConfirm={() => onHandleDeleteMember(openFamilyDeleteModal)}
          isLoading={isLoadingDeleteMember}
          title={t("familyMember.deleteConfirm.modal.title")}
          description={t("familyMember.deleteConfirm.modal.description", {
            member: openFamilyDeleteModal?.name,
          })}
        />
      )} */}
    </>
  );
};
