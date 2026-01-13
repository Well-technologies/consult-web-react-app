import clsx from "clsx";

import AvatarIcon from "@/assets/icons/avatar_icon.png";

import { AvatarProps } from "./Avatar.types";

export const Avatar = ({ className, imageUrl, defaultIcon }: AvatarProps) => {
  
  return (
    <div
      className={clsx(
        "relative inline-flex border border-secondary-100 items-center justify-center aspect-square overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600",
        className
      )}
    >
      <img
        className={clsx("w-full h-full object-contain")}
        src={imageUrl || defaultIcon || AvatarIcon}
        alt={`${imageUrl || "AvatarIcon"}-logo`}
      />
    </div>
  );
};
