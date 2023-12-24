import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { ExpenseQueryModel } from "../../../api/types";
import ExpensesTable from "./ExpensesTable";
import { subMonths } from "date-fns";
import Input from "../../../components/form/Input";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { getEntitiesFn } from "../../../api/api";
import { formatDate } from "../../../utils/format/date";

const Expenses = ({
  onSelectChange,
}: {
  onSelectChange: (e: ExpenseQueryModel) => void;
}) => {
  const [editExpense, setEditExpense] = useState(false);
  const [expense, setExpense] = useState<ExpenseQueryModel | null>(null);
  const { control, handleSubmit } = useForm<ExpenseQueryModel>({
    defaultValues: {
      datum_rashoda: formatDate(new Date()),
      id_rashoda: 0,
      naziv_kulture: "",
      naziv_masine: "",
      naziv_operacije: "",
      naziv_parcele: "",
      sifra_kulture: "",
      sifra_masine: "",
      sifra_operacije: "",
      sifra_parcele: "",
    },
    values: expense || undefined,
  });
  const [dates, setDates] = useState({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });

  const { data, isLoading } = useQuery("ENTITIES", getEntitiesFn);

  const submitCallback = useCallback((e: any) => {
    console.log(e);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(submitCallback)}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Input
                control={control}
                label="Datum"
                type="date"
                name={"datum_rashoda"}
              />
            </IonCol>
            <IonCol>
              <Input
                control={control}
                label="Operacija"
                name={"sifra_operacije"}
                inputType="select"
                options={
                  data?.data.operacije.map((e) => ({
                    label: e.naziv_operacije || "-",
                    value: e.sifra_operacije!!,
                  })) || []
                }
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Input
                control={control}
                label="Kultura"
                name={"sifra_kulture"}
                inputType="select"
                options={
                  data?.data.kulture.map((e) => ({
                    label: e.naziv_kulture || "-",
                    value: e.sifra_kulture!!,
                  })) || []
                }
              />
            </IonCol>
            <IonCol>
              <Input
                control={control}
                label="Masina"
                name={"sifra_masine"}
                inputType="select"
                options={
                  data?.data.masine.map((e) => ({
                    label: e.naziv_masine || "-",
                    value: e.sifra_masine!!,
                  })) || []
                }
              />
            </IonCol>
            <IonCol>
              <Input
                control={control}
                label="Parcela"
                name={"sifra_parcele"}
                inputType="select"
                options={
                  data?.data.parcele.map((e) => ({
                    label: e.naziv_parcele || "-",
                    value: e.sifra_parcele!!,
                  })) || []
                }
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IonButton size="small" disabled={!editExpense}>
          Prihvati
        </IonButton>
        <IonButton size="small" disabled={!editExpense} fill="outline">
          Odustani
        </IonButton>
        <IonButton
          size="small"
          disabled={editExpense}
          onClick={() => setEditExpense(false)}
        >
          Izmeni
        </IonButton>
      </div>
      <ExpensesTable
        from={dates.from}
        to={dates.to}
        onSelectChange={(e) => {
          setExpense(e);
          onSelectChange(e);
        }}
      />
    </div>
  );
};

export default Expenses;
