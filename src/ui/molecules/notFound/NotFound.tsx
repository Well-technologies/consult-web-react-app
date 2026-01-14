import clsx from "clsx";

import NoResultImage from "@/assets/icons/no_result_red.png";

import { NotFoundProps } from "./NotFound.types";

export const NotFound = ({
  text,
  className,
  image,
  imageClassName,
  textClassName,
  children,
}: NotFoundProps) => {
  return (
    <div
      className={clsx(
        "w-fill-available min-h-[50vh] flex flex-col justify-center items-center gap-4 p-4",
        className
      )}
    >
      <img
        src={image || NoResultImage}
        className={clsx("w-1/8", imageClassName)}
        alt="No Result Image"
      />
      <p className={clsx("text-lg font-bold text-secondary", textClassName)}>
        {text}
      </p>
      <p className={clsx("text-lg font-bold text-secondary", textClassName)}>
        {children}
      </p>
    </div>
  );
};
