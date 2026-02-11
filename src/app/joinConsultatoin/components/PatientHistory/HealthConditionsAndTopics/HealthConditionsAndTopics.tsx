import { HealthConditions } from "./HealthConditions";
import { HealthTopics } from "./HealthTopics";

type HealthConditionsAndTopicsProps = {
  patientId: string;
  doctorId: number;
};

export const HealthConditionsAndTopics = (
  props: HealthConditionsAndTopicsProps
) => {
  return (
    <div>
      <HealthConditions {...props} />
      <HealthTopics {...props} />
    </div>
  );
};
