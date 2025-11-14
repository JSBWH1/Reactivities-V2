// DateTimeInput.tsx
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import type { DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";

type Props<T extends FieldValues> =
  UseControllerProps<T> &
  Omit<DateTimePickerProps, "value" | "onChange">;

export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController(props);

  const pickerValue =
    field.value ? new Date(field.value as unknown as Date) : null;

  return (
    <DateTimePicker
      {...props}
      value={pickerValue}
      onChange={(value) => field.onChange(value)}
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: !!fieldState.error,
          helperText: fieldState.error?.message,
        },
      }}
      sx={{ width: "100%" }}
    />
  );
}
