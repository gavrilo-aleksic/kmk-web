import {
  IonCheckbox,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { Control, Controller } from "react-hook-form";

export type IonicInputProps = React.ComponentProps<typeof IonInput>;

const Input = ({
  control,
  inputType,
  label,
  options,
  labelPosition,
  hideLabel,
  value,
  optional,
  ...rest
}: {
  name: string;
  control?: Control<any>;
  inputType?: "text" | "checkbox" | "select";
  label: string;
  options?: { label: string; value: string | number }[];
  labelPosition?: "fixed" | "floating" | "stacked";
  hideLabel?: boolean;
  optional?: boolean;
} & IonicInputProps) => {
  return (
    <IonItem lines={inputType === "checkbox" ? "none" : undefined}>
      <Controller
        name={rest.name}
        control={control}
        render={({ field }) => {
          switch (inputType) {
            case "checkbox":
              return (
                <>
                  <IonCheckbox
                    onIonChange={() => field.onChange(!field.value)}
                    checked={field.value}
                  >
                    {label}
                  </IonCheckbox>
                </>
              );
            case "select":
              return (
                <IonSelect
                  required={!optional}
                  label={label}
                  labelPlacement="floating"
                  onIonChange={field.onChange}
                  value={value || field.value}
                  {...(rest as any)}
                >
                  {options?.map((e) => (
                    <IonSelectOption key={e.value} value={e.value}>
                      {e.label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              );
            default:
              return (
                <IonInput
                  required={!optional}
                  label={label}
                  labelPlacement="floating"
                  value={value || field.value.toString()}
                  onIonChange={field.onChange}
                  step={rest.type === "number" ? "0.001" : undefined}
                  {...rest}
                />
              );
          }
        }}
      />
    </IonItem>
  );
};

export default Input;
