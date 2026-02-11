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
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Health Conditions & Topics
        </h3>
      </div>
      <HealthConditions {...props} />
      <HealthTopics {...props} />
    </div>
  );
};
