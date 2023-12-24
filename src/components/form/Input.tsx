import {
  IonCheckbox,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { Control, Controller, FieldValues } from "react-hook-form";

export type IonicInputProps = React.ComponentProps<typeof IonInput>;

const Input = ({
  control,
  inputType,
  label,
  options,
  labelPosition,
  hideLabel,
  value,
  ...rest
}: {
  name: string;
  control?: Control<any>;
  inputType?: "text" | "checkbox" | "select";
  label: string;
  options?: { label: string; value: string | number }[];
  labelPosition?: "fixed" | "floating" | "stacked";
  hideLabel?: boolean;
} & IonicInputProps) => {
  return (
    <IonItem lines={inputType === "checkbox" ? "none" : undefined}>
      {!hideLabel && (
        <IonLabel
          position={
            inputType !== "checkbox" ? "floating" : labelPosition || undefined
          }
        >
          {label}
        </IonLabel>
      )}
      <Controller
        name={rest.name}
        control={control}
        render={({ field }) => {
          switch (inputType) {
            case "checkbox":
              return (
                <IonCheckbox
                  onIonChange={() => field.onChange(!field.value)}
                  checked={field.value}
                />
              );
            case "select":
              return (
                <IonSelect
                  onIonChange={field.onChange}
                  value={value || field.value}
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
                  value={value || field.value.toString()}
                  onIonChange={field.onChange}
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
