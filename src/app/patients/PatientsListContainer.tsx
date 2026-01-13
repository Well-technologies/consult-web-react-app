import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";

import {
  useGetMyPatients,
} from "../../api/patient/patient";
import { CommonPaginationParams, ServiceConfigType } from "@/api/index.types";
import { useClient } from "@/hooks/useClient/useClient";
import { AppRoute } from "@/routing/AppRoute.enum";
import { FormType } from "@/types";

import { PatientList } from "./PatientsList";
import { UserDetails } from "@/api/patient/patient.types";
import { AddPatientModalContainer } from "./addPatientModal/AddPatientModalContainer";

export const PatientsListContainer = () => {
  const client = useClient({serviceConfigType: ServiceConfigType.Core});
  // const consultClient = useClient({serviceConfigType: ServiceConfigType.Consult});
  // const { t } = useTranslation();

  const  leadId  = useParams<'patientId'>();
  if (!leadId) return <Navigate to={AppRoute.Patients} replace />;

  const [openFilter, setOpenFilter] = useState(true);

  const [openUserModal, setOpenUserModal] = useState<{
    data: UserDetails | null;
    formType: FormType;
  } | null>(null);

  // const [openFamilyDeleteModal, setOpenFamilyDeleteModal] =
  //   useState<LeadFamily | null>(null);

  // const { lead_id } = useSelector(
  //   (rootState) =>
  //     allReducerStates(rootState as StoreReducerStateTypes).user.userDetails
  // );

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
    data: patientsData,
    isLoading: isLoadingPatientsData,
    refetch,
  } = useGetMyPatients({
    client,
    params: {
      doctor_id: '317',
      page: 1,
      page_size: 10
    }
  });

  
  // const {
  //   data: patientsData,
  //   isLoading: isLoadingPatientsData,
  //   refetch,
  // } = useSearchPatients({
  //   client,
  //   params: {
  //     patient: 
  //   }
  // });



  // const navigationOptions = getPatientDetailsBreadCrumbOptions();

  return (
    <>
      {/* <Breadcrumbs breadcrumbs={navigationOptions} /> */}
      <PatientList
      data={patientsData?.data?.sort((a, b) => (new Date(b.created_at).getTime()) - (new Date( a.created_at).getTime())) || []}
      isLoading={isLoadingPatientsData}
        openAddNewModal={onOpenUserModal}
        openFilter={openFilter}
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
