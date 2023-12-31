import {
  IonButton,
  IonCol,
  IonGrid,
  IonLabel,
  IonRow,
  IonToast,
} from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { ExpenseQueryModel } from "../../../api/types";
import ExpensesTable from "./ExpensesTable";
import { subMonths } from "date-fns";
import Input from "../../../components/form/Input";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  getEntitiesFn,
  getExpensesFn,
  updateExpensesFn,
} from "../../../api/api";
import { formatDate } from "../../../utils/format/date";

const Expenses = ({
  onSelectChange,
}: {
  onSelectChange: (e: ExpenseQueryModel) => void;
}) => {
  const [editExpense, setEditExpense] = useState(false);
  const [expense, setExpense] = useState<ExpenseQueryModel | null>(null);
  const { control, handleSubmit, reset } = useForm<ExpenseQueryModel>({
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
    from: subMonths(new Date(), 3),
    to: new Date(),
  });

  const { refetch } = useQuery(["EXPENSES", dates.from, dates.to], () =>
    getExpensesFn(dates.from, dates.to)
  );

  const { data, error: entitiesError } = useQuery("ENTITIES", getEntitiesFn);
  const { mutate: updateModel, error: updateError } = useMutation(
    ["UPDATE_EXPENSE", expense?.id_rashoda],
    updateExpensesFn,
    {
      onSuccess: () => refetch(),
    }
  );

  const submitCallback = useCallback((e: any) => {
    updateModel(e);
    setEditExpense(false);
  }, []);

  useEffect(() => {
    setEditExpense(false);
  }, [expense]);

  const error = updateError || entitiesError;

  const editDisabled = !editExpense || !expense;
  return (
    <div className="content-card">
      <form onSubmit={handleSubmit(submitCallback)}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Input
                control={control}
                label="Datum"
                type="date"
                name={"datum_rashoda"}
                disabled={editDisabled}
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
                disabled={editDisabled}
              />
            </IonCol>
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
                disabled={editDisabled}
              />
            </IonCol>
          </IonRow>
          <IonRow>
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
                disabled={editDisabled}
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
                disabled={editDisabled}
              />
            </IonCol>
            <IonCol className="control-buttons-col">
              <div className="control-buttons">
                <IonButton size="small" disabled={!editExpense} type="submit">
                  Prihvati
                </IonButton>
                <IonButton
                  size="small"
                  disabled={!editExpense}
                  fill="outline"
                  onClick={() => {
                    setEditExpense(false);
                    if (expense) reset(expense);
                  }}
                >
                  Odustani
                </IonButton>
                <IonButton
                  size="small"
                  disabled={!expense}
                  onClick={() => setEditExpense(true)}
                >
                  Izmeni
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
      <ExpensesTable
        from={dates.from}
        to={dates.to}
        onSelectChange={(e) => {
          setExpense(e);
          onSelectChange(e);
        }}
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

export default Expenses;
