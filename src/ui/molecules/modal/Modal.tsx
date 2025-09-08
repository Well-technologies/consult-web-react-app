import { useEffect } from "react";

import { LogoLoader } from "@/ui/atoms/logoLoader/LogoLoader";

import { ModalProps } from "./Modal.types";
import { ModalFooter } from "./modalFooter/ModalFooter";
import { ModalHeader } from "./modalHeader/ModalHeader";
import { ModalLayout } from "./modalLayout/ModalLayout";

export const Modal = ({ children, isLoading, ...props }: ModalProps) => {
  useEffect(() => {
    if (props.open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden"); // Cleanup on unmount
  }, [props.open]);

  return (
    <ModalLayout {...props}>
      <ModalHeader {...props} />
      <div className="relative py-4 p-4 leading-normal text-slate-600 font-light ">
        {children}
        {isLoading ? (
          <div className="absolute w-full h-full top-0 bg-white">
            <LogoLoader isMaxSize={false} isFullHeight isFullWidth />
          </div>
        ) : null}
      </div>
      <ModalFooter isLoading={isLoading} {...props} />
    </ModalLayout>
  );
};
