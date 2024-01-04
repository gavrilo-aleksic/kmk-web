import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UsagesWorkerQueryModel } from "../../../api/types";
import UsagesWorkerTable from "./UsagesWorkerTable";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonLabel,
  IonToast,
} from "@ionic/react";
import Input from "../../../components/form/Input";
import { useMutation, useQuery } from "react-query";
import {
  getEntitiesFn,
  getUsagesWorkerFn,
  updateWorkerUsageFn,
} from "../../../api/api";

const UsagesWorker = ({ utrosakId }: { utrosakId?: number }) => {
  const [edit, setEdit] = useState(false);
  const [model, setModel] = useState<UsagesWorkerQueryModel | null>(null);
  const {
    data,
    isLoading,
    error: entitiesError,
  } = useQuery("ENTITIES", getEntitiesFn);

  const { control, handleSubmit, reset } = useForm<UsagesWorkerQueryModel>({
    defaultValues: {
      cas: 0,
      cas_cena: 0,
      cas_ucinak: 0,
      cas_zastoj: 0,
      id_rashodi_radnici: 0,
      ime_i_prezime_radnika: "",
      naziv_tipa_rada: "",
      pov_ucinak: 0,
      sifra_radnika: 0,
      sifra_tip_rada: 0,
      ucinak: 0,
      zastoj: 0,
    },
    values: model || undefined,
  });

  const { refetch } = useQuery(
    ["USAGES_WORKER", utrosakId],
    () => getUsagesWorkerFn(utrosakId!!),
    { enabled: !!utrosakId }
  );

  const { mutate: updateModel, error: updateError } = useMutation(
    ["UPDATE_USAGE_WORKER", model?.id_rashodi_radnici],
    updateWorkerUsageFn,
    {
      onSuccess: () => refetch(),
    }
  );

  const submitCallback = useCallback((e: any) => {
    updateModel(e);
    setEdit(false);
  }, []);

  useEffect(() => {
    setEdit(false);
  }, [model]);

  const editDisabled = !edit || !model;

  const error = updateError || entitiesError;

  return (
    <div className="content-card">
      <h6>Utrosak po radniku</h6>
      <IonGrid>
        <form onSubmit={handleSubmit(submitCallback)}>
          <IonRow>
            <IonCol>
              <Input
                control={control}
                label="Cas"
                type="number"
                name={"cas"}
                disabled={editDisabled}
              />
            </IonCol>
            <IonCol>
              <Input
                control={control}
                label="Ucinak"
                name={"ucinak"}
                type="number"
                disabled={editDisabled}
              />
            </IonCol>
            <IonCol>
              <Input
                control={control}
                label="Zastoj"
                name={"zastoj"}
                type="number"
                disabled={editDisabled}
              />
            </IonCol>
            <IonCol>
              <Input
                control={control}
                label="Vrsta Rada"
                name={"sifra_tip_rada"}
                inputType="select"
                options={
                  data?.data.tipoviRada.map((e) => ({
                    label:
                      e.naziv_tipa_rada || e.sifra_tip_rada?.toString() || "-",
                    value: e.sifra_tip_rada!!,
                  })) || []
                }
                disabled={editDisabled}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Input
                control={control}
                label="Cas Cena"
                type="number"
                name={"cas_cena"}
                disabled={editDisabled}
              />
            </IonCol>
            <IonCol>
              <Input
                control={control}
                label="Cas Ucinak"
                name={"cas_ucinak"}
                type="number"
                disabled={editDisabled}
              />
            </IonCol>
            <IonCol>
              <Input
                control={control}
                label="Cas Zastoj"
                name={"cas_zastoj"}
                type="number"
                disabled={editDisabled}
              />
            </IonCol>
            <IonCol>
              <Input
                control={control}
                label="Radnik"
                name={"sifra_radnika"}
                inputType="select"
                options={
                  data?.data.radnici.map((e) => ({
                    label:
                      e.ime_i_prezime_radnika ||
                      e.sifra_radnika?.toString() ||
                      "-",
                    value: e.sifra_radnika!!,
                  })) || []
                }
                disabled={editDisabled}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="3">
              <Input
                control={control}
                label="Povrsina"
                name={"pov_ucinak"}
                type="number"
                disabled={editDisabled}
              />
            </IonCol>
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
      <UsagesWorkerTable id={utrosakId} onSelectChange={(e) => setModel(e)} />
      <IonToast
        color="danger"
        message="Doslo je do greske"
        duration={3000}
        isOpen={!!error}
      />
    </div>
  );
};

export default UsagesWorker;
