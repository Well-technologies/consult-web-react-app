
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LogoLoader } from "@/ui/atoms/logoLoader/LogoLoader";
import { NotFound } from "@/ui/molecules/notFound/NotFound";
import { DataTable } from "@/ui/organisms/dataTable/DataTable";

import { UsersDataProps } from "./UsersData.types";
import { PatientDetails } from "../../../api/patient/patient.types";
import { ColumnDef } from "@tanstack/react-table";
import { AppRoute } from "@/routing/AppRoute.enum";
import { FormType } from "@/types";

export const UsersData = ({
  data,
  // setValue,
  isLoading,
  openAddNewModal,
  // onOpenEmployeeDeleteModal,
}: UsersDataProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const columns = useMemo<ColumnDef<PatientDetails>[]>(
    () => [
      {
        accessorKey: "name",
        id: "name",
        cell: (info) => info.getValue(),
        header: t("user.table.name.header"),
      },
      {
        accessorKey: "mobile_no",
        id: "mobileNo",
        cell: (info) => info.getValue(),
        header: t("user.table.mobileNo.header"),
      },
      {
        accessorKey: "date_of_birth",
        id: "date_of_birth",
        cell: (info) => info.getValue(),
        accessorFn: (row) => (
          <div className="flex gap-2 item-center text-black">
            {row.date_of_birth ? row.date_of_birth : ""}
          </div>
        ),
        header: t("user.table.date_of_birth.header"),
      },
      {
        accessorKey: "action",
        id: "action",
        accessorFn: (row) => row.isDisabled ? (
          <button
                        onClick={() => openAddNewModal(row, FormType.Add)}
                        className="flex gap-2 cursor-pointer items-center justify-center md:justify-start rounded-lg px-4 py-2 bg-primary-600 text-white text-sm"
                      >
                        <img
                          className="w-4 invert"
                          src="https://img.icons8.com/ios-glyphs/30/plus-math.png"
                          alt="plus-math"
                        />
                        {t("patient.new_user.button")}
                      </button>
        ) : <></>,
        cell: (info) => info.getValue(),
        header: "",
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
    return <NotFound text={t("user.table.notFound.text")} children={
      <button
                    onClick={() => openAddNewModal(null, FormType.Add)}
                    className="flex gap-2 cursor-pointer items-center justify-center md:justify-start rounded-lg px-4 py-2 bg-primary-600 text-white text-sm"
                  >
                    <img
                      className="w-4 invert"
                      src="https://img.icons8.com/ios-glyphs/30/plus-math.png"
                      alt="plus-math"
                    />
                    {t("patient.new_user.button")}
                  </button>
    }/>
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 lg:hidden ">
        {/* {data.map((item) => (
          <UserDataCard
            key={item.id}
            data={item}
            // openAddNewModal={openAddNewModal}
            {...item}
          />
        ))} */}
      </div>

      <div className="lg:flex">
        <DataTable columns={columns} data={data} onRowClick={(i) => !(data)[i].isDisabled && navigate(AppRoute.PatientDetails.replace(':leadId', data[i].id)) } />
      </div>

      <div className="h-1 bg-gray-100 mt-2" />
      {/* <div className="p-2 lg:p-2">
        <Pagination
          count={data?.last_page}
          onChange={(val) => setValue("page", val)}
          onPageSizeChange={(val) => setValue("page_size", val)}
          page={data.current_page}
          pageSize={data.per_page}
        />
      </div> */}
    </>
  );
};
