import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/ui/organisms/dataTable/DataTable";
import { LogoLoader } from "@/ui/atoms/logoLoader/LogoLoader";
import { NotFound } from "@/ui/molecules/notFound/NotFound";
import { ConsultationDetails } from "@/api/consult/consult.types";
import { ConsultationsProps } from "./Consultations.types";
import { convertISOToDateTime, convertISOToTime } from "@/utils/timeConvertor.utils";
import { Pagination } from "@/ui/atoms/pagination/Pagination";
import { AppRoute } from "@/routing/AppRoute.enum";
import { useNavigate } from "react-router-dom";

export const Consultations = ({
  data,
  meta,
  isLoading,
  isConsultationsRoute,
  isPatientDetailsRoute,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: ConsultationsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<ConsultationDetails>[]>(
    () => {
      // Columns for consultations route
      if (isConsultationsRoute) {
        return [
          {
            accessorKey: "appointmentDate",
            id: "appointmentDate",
            accessorFn: (row) => (convertISOToDateTime(row.appointmentDate) || "").split(" ")[0],
            cell: (info) => info.getValue(),
            header: `${t("consultation.table.consultation_date.header")}`,
          },
          {
            accessorKey: "appointmentTime",
            id: "appointmentTime",
            accessorFn: (row) => convertISOToTime(row.appointmentDate),
            cell: (info) => info.getValue(),
            header: `${t("consultation.table.consultation_time.header")}`,
          },
          {
            accessorKey: "patient",
            id: "patient",
            accessorFn: (row) => row.patient?.name || "-",
            cell: (info) => info.getValue(),
            header: `${t("consultation.table.patient.header")}`,
          },
          {
            accessorKey: "callType",
            id: "callType",
            accessorFn: (row) => row.callType || "-",
            cell: (info) => info.getValue(),
            header: `${t("consultation.table.call_type.header")}`,
          },
          {
            accessorKey: "appointmentStatus",
            id: "appointmentStatus",
            accessorFn: (row) => row.appointmentStatus || "-",
            cell: (info) => info.getValue(),
            header: `${t("consultation.table.appointment_status.header")}`,
          },
          {
            accessorKey: "appointmentType",
            id: "appointmentType",
            accessorFn: (row) => row.appointmentType || "-",
            cell: (info) => info.getValue(),
            header: `${t("consultation.table.appointment_type.header")}`,
          },
          {
            accessorKey: "callEndedType",
            id: "callEndedType",
            accessorFn: (row) => row.callEndedType || "-",
            cell: (info) => info.getValue(),
            header: `${t("consultation.table.call_ended_type.header")}`,
          },
          {
            accessorKey: "prescription",
            id: "prescription",
            accessorFn: (row) => row.prescription || "-",
            cell: (info) => info.getValue(),
            header: `${t("consultation.table.call_ended_type.header")}`,
          },
        ];
      }

      // Columns for patient details route (unchanged)
      const baseColumns: ColumnDef<ConsultationDetails>[] = [
        {
          accessorKey: "appointmentDate",
          id: "appointmentDate",
          accessorFn: (row) => (convertISOToDateTime(row.appointmentDate) || "").split(" ")[0],
          cell: (info) => info.getValue(),
          header: `${t("consultation.table.consultation_date.header")}`,
        },
        {
          accessorKey: "appointmentTime",
          id: "appointmentTime",
          accessorFn: (row) => (convertISOToDateTime(row.appointmentDate) || "").split(" ")[1],
          cell: (info) => info.getValue(),
          header: `${t("consultation.table.consultation_time.header")}`,
        },
        {
          accessorKey: "doctor",
          id: "doctor",
          accessorFn: (row) => `${row?.doctor?.doctor_prefix || 'Dr.'} ${row.doctor?.name || "-"}`,
          cell: (info) => info.getValue(),
          header: `${t("consultation.table.doctor.header")}`,
        },
        {
          accessorKey: "doctorSpecialty",
          id: "doctorSpecialty",
          accessorFn: (row) => row?.doctor?.doc_speciality_title || "-",
          cell: (info) => info.getValue(),
          header: `${t("consultation.table.doctor_specialty.header")}`,
        },
      ];

      return baseColumns;
    },
    [t, isConsultationsRoute, isPatientDetailsRoute]
  );

  if (isLoading) {
    return (
      <div className="w-fill-available h-[50vh] flex flex-col justify-center items-center gap-4 p-4">
        <LogoLoader isMaxSize={false} isFullHeight isFullWidth />
      </div>
    );
  }

  if (!data?.length) {
    return <NotFound text={t("consultation.table.notFound.text")} />;
  }

  return (
    <div className="flex flex-col p-2 gap-2 sm:gap-4">
      <div className="hidden lg:flex">
        <DataTable
          columns={columns}
          data={data}
          getRowId={(row) => `${row.id}`}
          onRowClick={(i) => data && navigate(AppRoute.ConsultationDetails.replace(':consultationId', data[i].id))}
        />
      </div>
      <div className="h-1 bg-gray-100 mt-2" />
      <div className="p-2 lg:p-2">
        {meta && (
          <Pagination
            count={Math.ceil(meta.total / meta.take)}
            onChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            page={page}
            pageSize={pageSize}
          />
        )}
      </div>
    </div>
  );
};
