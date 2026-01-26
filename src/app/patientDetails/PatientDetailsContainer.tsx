import { useEffect } from "react";
// import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";

import { ServiceConfigType } from "@/api/index.types";
import { useClient } from "@/hooks/useClient/useClient";
import { AppRoute } from "@/routing/AppRoute.enum";

import { PatientDetails } from "./PatientDetails";
import { useGetConsultUserDetails } from "@/api/user/user";
import { LeadIdParamType } from "@/routing/AppRoutes.types";
import { getPatientDetailsBreadCrumbOptions } from "./PatientDetails.utils";
import { Breadcrumbs } from "@/ui/molecules/breadcrumbs/Breadcrumbs";
import { useGetConsultations } from "@/api/consult/consult";
import { useGetPreviousLabOrders, useGetPreviousMedOrders } from "@/api/orders/orders";

export const PatientDetailsContainer = () => {
  const client = useClient({serviceConfigType: ServiceConfigType.Core});
  const consultClient = useClient({serviceConfigType: ServiceConfigType.Consult});
  // const { t } = useTranslation();

  const { leadId }  = useParams<LeadIdParamType>();

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
    leadId
  });

    const {
    data: consultations,
    isLoading: isLoadingConsultations,
    refetch: refatchConsultations,
  } = useGetConsultations({
    client: consultClient,
    params: {
      patient: consultPatient?.payload?.id || '',
      page: 1,
      take: 20
    },
    

  });


  const {
    data: labOrders,
  } = useGetPreviousLabOrders({
    client: client,
    params: {
      lead_id: consultPatient?.payload?.lead_id,
      page: 1,
      take: 20
    },
    options: {
      enabled: !!consultPatient?.payload?.lead_id,
    }
    
  });

    const {
    data: medOrders,
  } = useGetPreviousMedOrders({
    client: client,
    params: {
      lead_id: consultPatient?.payload?.lead_id,
      page: 1,
      take: 20
    },
    options: {
      enabled: !!consultPatient?.payload?.lead_id,
    }
    
  });


  useEffect(()=>{
    console.log(consultPatient)
    refatchConsultations();
  }, [consultPatient?.payload?.id])

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
