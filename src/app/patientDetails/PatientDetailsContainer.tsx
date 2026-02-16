import { useEffect } from "react";
// import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";

import { useGetConsultations } from "@/api/consult/consult";
import { ServiceConfigType } from "@/api/index.types";
import {
  useGetPreviousLabOrders,
  useGetPreviousMedOrders,
} from "@/api/orders/orders";
import { useGetPatientHealthVault } from "@/api/patient/patient";
import { useGetConsultUserDetails } from "@/api/user/user";
import { useClient } from "@/hooks/useClient/useClient";
import { useCustomSelector } from "@/hooks/useCustomSelector/useCustomSelector";
import { AppRoute } from "@/routing/AppRoute.enum";
import { LeadIdParamType } from "@/routing/AppRoutes.types";
import { Breadcrumbs } from "@/ui/molecules/breadcrumbs/Breadcrumbs";

import { PatientDetails } from "./PatientDetails";
import { getPatientDetailsBreadCrumbOptions } from "./PatientDetails.utils";

export const PatientDetailsContainer = () => {
  const client = useClient({ serviceConfigType: ServiceConfigType.Core });
  const consultClient = useClient({
    serviceConfigType: ServiceConfigType.Consult,
  });
  // const { t } = useTranslation();

  const doctorId = useCustomSelector((rootState) => rootState.user.profile.id);

  const { leadId } = useParams<LeadIdParamType>();

  if (!leadId) return <Navigate to={AppRoute.Patients} replace />;

  // const [openFilter, setOpenFilter] = useState(true);

  // const [openUserModal, setOpenUserModal] = useState<{
  //   data: OrganizationUserDetails | null;
  //   formType: FormType;
  // } | null>(null);

  // const [openFamilyDeleteModal, setOpenFamilyDeleteModal] =
  //   useState<LeadFamily | null>(null);

  // const { lead_id } = useSelector(
  //   (rootState) =>
  //     allReducerStates(rootState as StoreReducerStateTypes).user.userDetails
  // );

  // const patientFrom = useForm<CommonPaginationParams>({
  //   shouldUnregister: false,
  //   defaultValues: {
  //     page: 1,
  //     page_size: 10,
  //   },
  // });

  // const openAndCloseFilter = () => {
  //   setOpenFilter(!openFilter);
  //   if (openFilter) {
  //     patientFrom.reset({
  //       page: 1,
  //       page_size: 10,
  //     });
  //   }
  // };

  const {
    data: consultPatient,
    isLoading: isLoadingConsultPatient,
    // refetch: refatchConsultPatient,
  } = useGetConsultUserDetails({
    client: consultClient,
    leadId,
  });

  const {
    data: consultations,
    isLoading: isLoadingConsultations,
    refetch: refatchConsultations,
  } = useGetConsultations({
    client: consultClient,
    params: {
      patient: consultPatient?.payload?.id || "",
      page: 1,
      take: 20,
    },
  });

  const { data: labOrders } = useGetPreviousLabOrders({
    client: client,
    params: {
      lead_id: consultPatient?.payload?.lead_id,
      page: 1,
      take: 20,
    },
    options: {
      enabled: !!consultPatient?.payload?.lead_id,
    },
  });

  const { data: medOrders } = useGetPreviousMedOrders({
    client: client,
    params: {
      lead_id: consultPatient?.payload?.lead_id,
      page: 1,
      take: 20,
    },
    options: {
      enabled: !!consultPatient?.payload?.lead_id,
    },
  });

  useEffect(() => {
    console.log(consultPatient);
    refatchConsultations();
  }, [consultPatient?.payload?.id]);

  const {
    data: healthVaultData,
    isLoading: isLoadingHealthVault,
    error: healthVaultError,
  } = useGetPatientHealthVault({
    client: consultClient,
    params: {
      userId: consultPatient?.payload?.lead_id?.toString(),
    },
    options: {
      enabled: !!consultPatient?.payload?.lead_id,
    },
  });

  const navigationOptions = getPatientDetailsBreadCrumbOptions();

  return (
    <>
      <Breadcrumbs breadcrumbs={navigationOptions} />
      <PatientDetails
        data={consultPatient?.payload}
        isLoading={isLoadingConsultPatient || isLoadingConsultations}
        consultations={consultations?.payload}
        labOrders={labOrders?.data}
        medOrders={medOrders?.data}
        healthVaultData={healthVaultData?.payload}
        // openAddNewModal={onOpenUserModal}
        // openFilter={openFilter}
        // openAndCloseFilter={openAndCloseFilter}
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
