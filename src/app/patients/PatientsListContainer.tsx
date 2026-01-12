import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import {
  useGetMyPatients,
} from "../../api/patient/patient";
import { CommonPaginationParams, ServiceConfigType } from "@/api/index.types";
import { LeadFamily } from "@/api/user/user.types";
import { useClient } from "@/hooks/useClient/useClient";
import { AppRoute } from "@/routing/AppRoute.enum";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";
import { FormType } from "@/types";

import { PatientList } from "./PatientsList";

export const PatientsListContainer = () => {
  const client = useClient({serviceConfigType: ServiceConfigType.Core});
  // const consultClient = useClient({serviceConfigType: ServiceConfigType.Consult});
  const { t } = useTranslation();

  const  leadId  = useParams<'patientId'>();
  if (!leadId) return <Navigate to={AppRoute.Patients} replace />;

  const [openFilter, setOpenFilter] = useState(true);

  // const [openUserModal, setOpenUserModal] = useState<{
  //   data: OrganizationUserDetails | null;
  //   formType: FormType;
  // } | null>(null);

  // const [openFamilyDeleteModal, setOpenFamilyDeleteModal] =
  //   useState<LeadFamily | null>(null);

  const { lead_id } = useSelector(
    (rootState) =>
      allReducerStates(rootState as StoreReducerStateTypes).user.userDetails
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

  const {
    data: employeeData,
    isLoading: isLoadingEmployeeData,
    refetch,
  } = useGetMyPatients({
    client,
    params: { 
    doctor_id: '317',
    page: 1,
    page_size: 10
    }
  });



  // const navigationOptions = getPatientDetailsBreadCrumbOptions();

  return (
    <>
      {/* <Breadcrumbs breadcrumbs={navigationOptions} /> */}
      <PatientList
      data={employeeData?.data?.sort((a, b) => (new Date(b.created_at).getTime()) - (new Date( a.created_at).getTime())) || []}
      isLoading={isLoadingEmployeeData}
        // openAddNewModal={onOpenUserModal}
        openFilter={openFilter}
        openAndCloseFilter={openAndCloseFilter}
      />
      {/* {openUserModal && (
        <AddUserModalContainer
          refetch={refetch}
          open={!!openUserModal}
          onClose={() => setOpenUserModal(null)}
          {...openUserModal}
        />
      )} */}

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
