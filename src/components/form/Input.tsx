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
  ...rest
}: {
  name: string;
  control: Control<any>;
  inputType?: "text" | "checkbox" | "select";
  label: string;
  options?: { label: string; value: string }[];
} & IonicInputProps) => {
  return (
    <IonItem lines={inputType === "checkbox" ? "none" : undefined}>
      <IonLabel position={inputType !== "checkbox" ? "floating" : undefined}>
        {label}
      </IonLabel>
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
                  value={field.value.toString()}
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
                  value={field.value.toString()}
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
