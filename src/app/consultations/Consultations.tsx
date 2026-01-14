import { useTranslation } from "react-i18next";


// import { ConsultationsProps } from "../Consultations/Consultations.types";
import { useMemo } from "react";
import { DataTable } from "@/ui/organisms/dataTable/DataTable";
import { LogoLoader } from "@/ui/atoms/logoLoader/LogoLoader";
import { NotFound } from "@/ui/molecules/notFound/NotFound";
import { ColumnDef } from "@tanstack/react-table";
import { ConsultationDetails } from "@/api/consult/consult.types";
import { ConsultationsProps } from "./Consultations.types";
import { convertISOToDateTime } from "@/utils/timeConvertor.utils";
// import { UsersData } from "./usersData/UsersData";

export const Consultations = ({
  // openAddNewModal,
  data,
  // consultations,
  // openFilter,
  isLoading,
  // openAndCloseFilter,
  // ...props
}: ConsultationsProps) => {
  
  // const [activeTab, setActiveTab] = useState(ConsultationsTab.Consultations);
  const { t } = useTranslation();


  const columns = useMemo<ColumnDef<ConsultationDetails>[]>(
    () => [
      {
        accessorKey: "appointmentDate",
        id: "appointmentDate",
        accessorFn: (row) => (convertISOToDateTime(row.appointmentDate) || "").split(" ")[0],
        cell: (info) => info.getValue(),
        header: `${t("consultation.table.consultation_date.header")}`,
      },
      {
        accessorKey: "doctor",
        id: "doctor",
        accessorFn: (row) => `${row?.doctor?.doctor_prefix || 'Dr.'} ${row.doctor?.name}`,
        cell: (info) => info.getValue(),
        header: `${t("consultation.table.doctor.header")}`,
      },
      {
        accessorKey: "doctor",
        id: "doctorSpecialties",
        accessorFn: (row) => `${row?.doctor?.doc_speciality_title}`,
        cell: (info) => info.getValue(),
        header: `${t("consultation.table.doctor_specialty.header")}`,
      },
      ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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
          // {...getTableOptions(!!enableRowSelection)}
        />
      </div>
      <div className="h-1 bg-gray-100 mt-2" />
      <div className="p-2 lg:p-2">
        {/* <Pagination
          count={data.last_page}
          onChange={(val) => setValue("page", val)}
          onPageSizeChange={(val) => setValue("page_size", val)}
          page={data.current_page}
          pageSize={data.per_page}
        /> */}
      </div>
    </div>  );
};
