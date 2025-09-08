import { useState } from "react";
import { useTranslation } from "react-i18next";

import Trash from "@/assets/icons/icons8-trash-red.svg";
import { Input } from "@/ui/atoms/input/input";

import { Modal } from "../modal/Modal";
import { DeleteConfirmModalProps } from "./DeleteConfirmModal.types";

export const DeleteConfirmModal = ({
  confirmKey,
  description,
  ...props
}: DeleteConfirmModalProps) => {
  const [confirmTextValue, setConfirmTextValue] = useState("");
  const { t } = useTranslation();

  return (
    <Modal
      confirmButtonText={t("deleteConfirm.modal.submit")}
      cancelButtonText={t("global.modal.cancel")}
      modalLayoutClassName="w-full h-full sm:w-[400px]! h-screen sm:h-auto"
      modalFooterClassName="fixed! sm:relative!"
      isCloseOnOutsideClickDisabled
      disabled={confirmKey !== confirmTextValue}
      headerClassNames={{ container: "justify-center", title: "text-xl!" }}
      {...props}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <img className="size-14" src={Trash} alt="closeIcon" />

        <div className="flex w-full justify-center text-center">
          {description}
        </div>

        <Input
          type="text"
          placeholder={t("deleteConfirm.modal.placeholder")}
          className="w-full mt-3"
          value={confirmTextValue}
          onChange={(e) => {
            setConfirmTextValue(e.target.value);
          }}
        />
      </div>
    </Modal>
  );
};
