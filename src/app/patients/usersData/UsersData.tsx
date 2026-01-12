
import clsx from "clsx";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LogoLoader } from "@/ui/atoms/logoLoader/LogoLoader";
import { NotFound } from "@/ui/molecules/notFound/NotFound";
import { DataTable } from "@/ui/organisms/dataTable/DataTable";

import { UsersDataProps } from "./UsersData.types";
import { getCSSAndStatusFromStatus } from "./UsersData.utils";
import { PatientDetails } from "../../../api/patient/patient.types";
import { ColumnDef } from "@tanstack/react-table";
import { AppRoute } from "@/routing/AppRoute.enum";

export const UsersData = ({
  data,
  // setValue,
  isLoading,
  // openAddNewModal,
  // onOpenEmployeeDeleteModal,
}: UsersDataProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // const { subCompanies, ...parent } = useSelector(
  //   (rootState) =>
  //     allReducerStates(rootState as StoreReducerStateTypes).user.companyDetails
  // );

  const companies = data;
  console.log('data', data)

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
        accessorKey: "email",
        id: "email",
        cell: (info) => info.getValue(),
        header: t("user.table.email.header"),
      },
      // {
      //   accessorKey: "organization_id",
      //   id: "organizationId",
      //   accessorFn: (row) =>
      //     companies?.find((item) => item.id == row.id)
      //       ?.companyName || "",
      //   cell: (info) => info.getValue(),
      //   header: t("user.table.organizationId.header"),
      // },
      {
        accessorFn: (row) => {
          const { css, statusName } = getCSSAndStatusFromStatus(row);
          return (
            <div className="flex">
              <div
                className={clsx(
                  "flex w-auto text-center rounded-2xl py-1 px-2 text-xs font-medium",
                  css
                )}
              >
                {statusName}
              </div>
            </div>
          );
        },
        id: "status",
        header: t("user.table.status.header"),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "created_at",
        id: "createdDate",
        accessorFn: (row) => (String(row.created_at) || "").split(" ")[0],
        cell: (info) => info.getValue(),
        header: t("user.table.createdDate.header"),
      },
      // {
      //   accessorFn: (row) => (
      //     <div className="flex gap-2 item-center">
      //       {!row?.claims_deleted_leads && (
      //         <>
      //           <button
      //             // onClick={() => openAddNewModal(row, FormType.Edit)}
      //             className={clsx(
      //               "flex p-1 rounded-full gap-4 items-center cursor-pointer hover:bg-secondary-50"
      //             )}
      //           >
      //             <img
      //               className="w-5"
      //               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABrUlEQVR4nO3ZPU7DMBjG8T+fC0XiAjCgFgqsHIKVAbEBd+AA7QQj4iRsTAikQs4AC1P56MSAWKlRpTdSFLnBTeKPSH4kS1USN/7Vb105hZiYMlkEesAz8A08AQc0LEvADaBy7bdpmDMNIm0JDchc5vXVFMgPgWcFuAOOM8cuNZAXAk4LeJSBvgLLBTNzTgMQQ6CtuSbFTBaABQJHvGkQ2Zk5ldVMm6RgdbDV+oaItpTZocknEgqio0EM5fx9bjUrhLhenR7kvp/ATu58R3BKfs1XTd7UNcQKwjXEGsIlxCrCFcQ6wgUkixjZQtiG5BG7hoh+SJAqCBUKpCyi0njqhlRBBAP5D7Fl8MVWviEmiHeD1Un5hNSF8AqpE+ENUjfCC8QGwjlksskZSL8PoJs735XjSjZPLcvjKd1xU/qMgf0aEc4hR5l+SaZstkuWkzfIRW4fnsjMVEU4h9xqHiqMK5STN8hoyhOSqginkA25/ktK6Bo4AfaA+TID8AVZA9bL3MjSeLw8RTGJihDijFiJiqVFLC0rUbG0iKUVZmmpwNrMSf/HC6kNZmfEEET+AIuwuiH/1a/LAAAAAElFTkSuQmCC"
      //               alt="edit-new"
      //             />
      //           </button>
      //           <button
      //             onClick={() =>
      //               navigate(
      //                 AppRoute.EmployeeDetails.replace(":employeeId", row.id)
      //               )
      //             }
      //             className="flex p-1 rounded-full gap-4 items-center cursor-pointer hover:bg-secondary-50"
      //           >
      //             <img className="w-5" src={EyeIcon} alt="view-new" />
      //           </button>
      //           <button
      //             // onClick={() => onOpenEmployeeDeleteModal(row)}
      //             className={clsx(
      //               "flex p-1 rounded-full gap-4 items-center cursor-pointer hover:bg-secondary-50"
      //             )}
      //           >
      //             <img className="w-5" src={DeleteIcon} alt="edit-new" />
      //           </button>
      //         </>
      //       )}
      //     </div>
      //   ),
      //   id: "actions",
      //   header: t("user.table.actions.header"),
      //   cell: (info) => info.getValue(),
      // },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  if (isLoading) {
    return (
      <div className="w-fill-available h-[50vh] flex flex-col justify-center items-center gap-4 p-4">
        <LogoLoader isMaxSize={false} isFullHeight isFullWidth />
      </div>
    );
  }

  if (!data?.length) {
    return <NotFound text={t("user.table.notFound.text")} />;
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
        <DataTable columns={columns} data={data} onRowClick={(i) => navigate(AppRoute.PatientDetails.replace(':leadId', data[i].id)) } />
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
