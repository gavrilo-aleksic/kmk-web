import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UsagesWorkerQueryModel } from "../../../api/types";
import UsagesWorkerTable from "./UsagesWorkerTable";
import { IonGrid, IonRow, IonCol, IonButton, IonLabel } from "@ionic/react";
import Input from "../../../components/form/Input";

const UsagesWoker = ({ utrosakId }: { utrosakId?: number }) => {
  const [edit, setEdit] = useState(false);
  const [model, setModel] = useState<UsagesWorkerQueryModel | null>(null);
  const { control, handleSubmit } = useForm<UsagesWorkerQueryModel>({
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

  const submitCallback = useCallback((e: any) => {
    console.log(e);
  }, []);

  useEffect(() => {
    setEdit(false);
  }, [model]);

  const editDisabled = !edit || !model;
  return (
    <div className="content-card">
      <h6>Utrosak po radniku</h6>
      <IonGrid>
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
              options={[]}
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
              options={[]}
              disabled={editDisabled}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
      <UsagesWorkerTable id={utrosakId} onSelectChange={(e) => setModel(e)} />
    </div>
  );
};

export default UsagesWoker;
