import { LeadActiveStatus } from "@/api/user/user.types";
import EyeIcon from "@/assets/icons/eye_icon.png";
import { FormType } from "@/types";
import { CardViewActionOption } from "@/ui/molecules/CardViewActions/CardViewActions.types";

import { GetCardViewActionOptionsProps } from "./UserDataCard.types";

export const getCardViewActionOptions = ({
  data: UserData,
  data: { is_active },
  openAddNewModal,
}: GetCardViewActionOptionsProps): CardViewActionOption[] => {
  return [
    {
      onClick: () => openAddNewModal(UserData, FormType.View),
      icon: <img className="w-5" src={EyeIcon} alt="view-new" />,
      text: "View",
    },
    {
      onClick: () => openAddNewModal(UserData, FormType.Edit),
      icon: (
        <img
          className="w-5"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABrUlEQVR4nO3ZPU7DMBjG8T+fC0XiAjCgFgqsHIKVAbEBd+AA7QQj4iRsTAikQs4AC1P56MSAWKlRpTdSFLnBTeKPSH4kS1USN/7Vb105hZiYMlkEesAz8A08AQc0LEvADaBy7bdpmDMNIm0JDchc5vXVFMgPgWcFuAOOM8cuNZAXAk4LeJSBvgLLBTNzTgMQQ6CtuSbFTBaABQJHvGkQ2Zk5ldVMm6RgdbDV+oaItpTZocknEgqio0EM5fx9bjUrhLhenR7kvp/ATu58R3BKfs1XTd7UNcQKwjXEGsIlxCrCFcQ6wgUkixjZQtiG5BG7hoh+SJAqCBUKpCyi0njqhlRBBAP5D7Fl8MVWviEmiHeD1Un5hNSF8AqpE+ENUjfCC8QGwjlksskZSL8PoJs735XjSjZPLcvjKd1xU/qMgf0aEc4hR5l+SaZstkuWkzfIRW4fnsjMVEU4h9xqHiqMK5STN8hoyhOSqginkA25/ktK6Bo4AfaA+TID8AVZA9bL3MjSeLw8RTGJihDijFiJiqVFLC0rUbG0iKUVZmmpwNrMSf/HC6kNZmfEEET+AIuwuiH/1a/LAAAAAElFTkSuQmCC"
          alt="edit-new"
        />
      ),
      text: "Edit",
      className:
        is_active !== LeadActiveStatus.Active ? "opacity-20" : "cursor-pointer",
    },
  ];
};
