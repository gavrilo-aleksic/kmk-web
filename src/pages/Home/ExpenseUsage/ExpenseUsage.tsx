import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { getEntitiesFn } from "../../../api/api";
import { ExpenseUsageQueryModel } from "../../../api/types";
import Input from "../../../components/form/Input";
import ExpenseUsageTable from "./ExpenseUsageTable";

const ExpenseUsage = ({ utrosakId }: { utrosakId?: number }) => {
  const [edit, setEdit] = useState(false);
  const [model, setModel] = useState<ExpenseUsageQueryModel | null>(null);
  const { data, isLoading } = useQuery("ENTITIES", getEntitiesFn);

  const { control, handleSubmit } = useForm<ExpenseUsageQueryModel>({
    defaultValues: {
      id_rashodi_utrosci: 0,
      kolicina_utroska: 0,
      naziv_utroska: "",
      sifra_utroska: "",
    },
    values: model || undefined,
  });

  const submitCallback = useCallback((e: any) => {
    console.log(e);
  }, []);

  useEffect(() => {
    setEdit(false);
  }, [model]);

  const editDisabled = !edit || !model;
  return (
    <div className="content-card">
      <h6>Ostali utrosak</h6>
      <IonGrid>
        <IonRow>
          <IonCol>
            <Input
              control={control}
              label="Utrosak"
              name={"cas"}
              disabled={editDisabled}
              inputType="select"
              options={
                data?.data.utrosci.map((e) => ({
                  label: e.naziv_utroska || e.sifra_utroska?.toString() || "-",
                  value: e.sifra_utroska!!,
                })) || []
              }
            />
          </IonCol>
          <IonCol>
            <Input
              control={control}
              label="Kolicina"
              name={"kolicina_utroska"}
              type="number"
              disabled={editDisabled}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="control-buttons-col">
            <div className="control-buttons">
              <IonButton size="small" disabled={!edit}>
                Prihvati
              </IonButton>
              <IonButton
                size="small"
                disabled={!edit}
                fill="outline"
                onClick={() => setEdit(false)}
              >
                Odustani
              </IonButton>
              <IonButton
                size="small"
                disabled={!model}
                onClick={() => setEdit(true)}
              >
                Izmeni
              </IonButton>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
      <ExpenseUsageTable
        utrosakId={utrosakId}
        onSelectChange={(e) => setModel(e)}
      />
    </div>
  );
};

export default ExpenseUsage;
