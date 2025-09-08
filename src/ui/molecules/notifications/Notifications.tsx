import { ToastContainer, Slide } from "react-toastify";

export const Notifications = () => {
  return (
    <ToastContainer
      theme="dark"
      hideProgressBar={false}
      className={""}
      toastClassName={"bg-secondary! text-sm w-auto! min-h-auto! pr-6! m-1!"}
      position="top-right"
      pauseOnHover
      draggable
      autoClose={3000}
      transition={Slide}
    />
  );
};
