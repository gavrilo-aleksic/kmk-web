import { IonCheckbox, IonInput } from "@ionic/react";
import { Control, Controller, FieldValues } from "react-hook-form";

export type IonicInputProps = React.ComponentProps<typeof IonInput>;

const Input = ({
  control,
  inputType,
  ...rest
}: {
  name: string;
  control: Control<any>;
  inputType?: "text" | "checkbox";
} & IonicInputProps) => {
  return (
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
  );
};

export default Input;
