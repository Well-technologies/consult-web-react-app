import { ClinicalOrderDetails } from "@/api/orders/orders.types";

export const PreviousLabOrders = ({ data }: { data: ClinicalOrderDetails[] | undefined }) => {
    console.log('PreviousLabOrders', data)

    return (
        <div>
            <h2>Previous Lab Orders</h2>
        <ul>
        {data?.map((item) => <li key={item.id}>{item.orderItems?.map((orderItem) => orderItem.order_item_id)}</li>)}
    </ul>
        </div>
    )

    
    // <>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 lg:hidden ">
    //     {/* {data.map((item) => (
    //       <UserDataCard
    //         key={item.id}
    //         data={item}
    //         // openAddNewModal={openAddNewModal}
    //         {...item}
    //       />
    //     ))} */}
    //   </div>

    //   <div className="lg:flex">
    //     <DataTable columns={columns} data={data} />
    //   </div>

    //   <div className="h-1 bg-gray-100 mt-2" />
    //   {/* <div className="p-2 lg:p-2">
    //     <Pagination
    //       count={data?.last_page}
    //       onChange={(val) => setValue("page", val)}
    //       onPageSizeChange={(val) => setValue("page_size", val)}
    //       page={data.current_page}
    //       pageSize={data.per_page}
    //     />
    //   </div> */}
    // </>
};