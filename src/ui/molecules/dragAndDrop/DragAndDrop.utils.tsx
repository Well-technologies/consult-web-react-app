import { DragAndDropVariant } from "./DragAndDrop.types";

export const getColorByVariant = (variant: DragAndDropVariant) => {
  switch (variant) {
    case DragAndDropVariant.Standard:
      return "secondary";

    case DragAndDropVariant.Error:
      return "primary";

    default:
      return "secondary";
  }
};
