import { IonCheckbox, IonInput, IonItem, IonLabel } from "@ionic/react";
import { Control, Controller, FieldValues } from "react-hook-form";

export type IonicInputProps = React.ComponentProps<typeof IonInput>;

const Input = ({
  control,
  inputType,
  label,
  ...rest
}: {
  name: string;
  control: Control<any>;
  inputType?: "text" | "checkbox";
  label: string;
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
            default:
              return (
                <IonInput
                  value={field.value}
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
