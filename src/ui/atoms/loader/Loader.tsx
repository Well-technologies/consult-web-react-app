import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import "./Loader.css";
import { LoaderProps } from "./Loader.types";

export const Loader = ({
  isMaxSize = true,
  isFullHeight = false,
  isFullWidth = false,
  className,
}: LoaderProps) => {
  const loaderClasses = twMerge(
    "flex items-center justify-center z-99999",
    isMaxSize && "w-screen h-screen fixed",
    !isMaxSize && isFullWidth && "w-full",
    !isMaxSize && isFullHeight && "h-full"
  );
  return (
    <div className={clsx(loaderClasses, className)}>
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
