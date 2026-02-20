export type TimePickerProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  timeRange?: {
    startTime: string;
    endTime: string;
  };
};
