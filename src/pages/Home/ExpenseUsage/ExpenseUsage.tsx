import { IonGrid, IonRow, IonCol, IonButton, IonToast } from "@ionic/react";
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  getEntitiesFn,
  getUsagesFn,
  updateExpenseUsageFn,
} from "../../../api/api";
import { ExpenseUsageQueryModel } from "../../../api/types";
import Input from "../../../components/form/Input";
import ExpenseUsageTable from "./ExpenseUsageTable";

const ExpenseUsage = ({ utrosakId }: { utrosakId?: number }) => {
  const [edit, setEdit] = useState(false);
  const [model, setModel] = useState<ExpenseUsageQueryModel | null>(null);
  const {
    data,
    isLoading,
    error: entitiesError,
  } = useQuery("ENTITIES", getEntitiesFn);

  const { control, handleSubmit, reset } = useForm<ExpenseUsageQueryModel>({
    defaultValues: {
      id_rashodi_utrosci: 0,
      kolicina_utroska: 0,
      naziv_utroska: "",
      sifra_utroska: "",
    },
    values: model || undefined,
  });

  const { refetch } = useQuery(
    ["USAGES", utrosakId],
    () => getUsagesFn(utrosakId!!),
    { enabled: !!utrosakId }
  );

  const { mutate: updateModel, error: updateError } = useMutation(
    ["UPDATE_EXPENSE_USAGE", model?.id_rashodi_utrosci],
    updateExpenseUsageFn,
    {
      onSuccess: () => {
        refetch();
        setEdit(false);
      },
    }
  );

  const submitCallback = useCallback((e: any) => {
    updateModel(e);
  }, []);

  useEffect(() => {
    setEdit(false);
  }, [model]);

  const editDisabled = !edit || !model;

  const error = updateError || entitiesError;
  return (
    <div className="content-card">
      <h6>Ostali utrosak</h6>
      <IonGrid>
        <form onSubmit={handleSubmit(submitCallback)}>
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
                    label:
                      e.naziv_utroska || e.sifra_utroska?.toString() || "-",
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
                <IonButton size="small" disabled={!edit} type="submit">
                  Prihvati
                </IonButton>
                <IonButton
                  size="small"
                  disabled={!edit}
                  fill="outline"
                  onClick={() => {
                    setEdit(false);
                    if (model) reset(model);
                  }}
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
        </form>
      </IonGrid>
      <ExpenseUsageTable
        utrosakId={utrosakId}
        onSelectChange={(e) => setModel(e)}
      />
      <IonToast
        color="danger"
        message="Doslo je do greske"
        duration={3000}
        isOpen={!!error}
      />
    </div>
  );
};

export default ExpenseUsage;
