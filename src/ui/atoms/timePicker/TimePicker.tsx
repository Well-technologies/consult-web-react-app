import { TimePickerProps } from "./TimePicker.types";

export const TimerPicker = ({
  value,
  onChange,
  timeRange,
  ...props
}: TimePickerProps) => {
  return (
    <div className="relative">
      <input
        type="time"
        className="block w-full p-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
        min={timeRange?.startTime || "09:00"}
        max={timeRange?.endTime || "18:00"}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};
