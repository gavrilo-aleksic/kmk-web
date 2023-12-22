import { useForm } from "react-hook-form";
import Input from "../../../components/form/Input";
import { useCallback } from "react";
import { IonButton } from "@ionic/react";

interface FilterData {
  datum: Date;
  kultura: string;
  parcela: string;
  masina: string;
  operacija: string;
}

const Filter = ({ onSubmit }: { onSubmit: (data: FilterData) => void }) => {
  const { control, handleSubmit } = useForm<FilterData>({
    defaultValues: {
      datum: new Date(),
      kultura: "",
      masina: "",
      operacija: "",
      parcela: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Datum" name="datum" control={control} type="date" />
      <Input label="Kultura" name="kultura" control={control} />
      <Input label="Parcela" name="parcela" control={control} />
      <Input label="Masina" name="masina" control={control} />
      <Input label="Operacija" name="operacija" control={control} />
      <IonButton type="submit">Prihvati</IonButton>
    </form>
  );
};

export default Filter;
