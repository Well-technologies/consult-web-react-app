import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import LogoLeft from "@/assets/icons/logo/log_left.png";
import LogoRight from "@/assets/icons/logo/log_right.png";

import "./LogoLoader.css";
import { LoaderProps } from "./LogoLoader.types";

export const LogoLoader = ({
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
      <div className="flex w-25 h-18 logoContainer">
        <div className="relative w-full h-full">
          <img
            src={LogoLeft}
            className="LogoLeft w-1/2 absolute aspect-square object-contain left-0"
            alt="LogoLeft"
          />
          <img
            src={LogoRight}
            className="LogoRight w-1/2 absolute aspect-square object-contain right-5 top-2"
            alt="LogoRight"
          />
        </div>
      </div>
    </div>
  );
};
