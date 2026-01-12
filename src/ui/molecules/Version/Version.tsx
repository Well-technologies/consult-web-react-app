import clsx from "clsx";

import { VersionProps } from "./Version.types";

const APP_VERSION = "0.0.1";

export const Version = ({ className }: VersionProps) => {
  return (
    <label className={clsx("text-xs text-secondary-400 font-light", className)}>
      {`v${APP_VERSION}`}
    </label>
  );
};
