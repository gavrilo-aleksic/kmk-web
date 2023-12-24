import { useQuery } from "react-query";
import { getExpensesFn } from "../../../api/api";
import DataGrid, { ColumnOrColumnGroup } from "react-data-grid";
import { IonSpinner, IonToast } from "@ionic/react";
import { formatDate } from "../../../utils/format/date";
import { ExpenseQueryModel } from "../../../api/types";

const columnsDefinition: ColumnOrColumnGroup<
  {
    datum_rashoda: string;
    id_rashoda?: number | undefined;
    naziv_parcele?: string | undefined;
    naziv_kulture?: Date | undefined;
    naziv_masine?: string | undefined;
    naziv_operacije?: string | undefined;
    sifra_masine?: string | undefined;
    sifra_parcele?: string | undefined;
    sifra_kulture?: string | undefined;
    sifra_operacije?: string | undefined;
  },
  unknown
>[] = [
  { key: "id_rashoda", name: "ID" },
  { key: "datum_rashoda", name: "Datum" },
  { key: "naziv_parcele", name: "Parcela", editable: true },
  { key: "naziv_masine", name: "Masina" },
  { key: "sifra_kulture", name: "Kultura" },
  { key: "naziv_operacije", name: "Operacija" },
];

const ExpensesTable = ({
  from,
  to,
  onSelectChange,
}: {
  from: Date;
  to: Date;
  onSelectChange: (e: ExpenseQueryModel) => void;
}) => {
  const { data, isLoading, error } = useQuery(["EXPENSES", from, to], () =>
    getExpensesFn(from, to)
  );

  return (
    <>
      <DataGrid
        style={{ zoom: 0.8 }}
        columns={columnsDefinition}
        rows={
          data?.data.map((e) => ({
            ...e,
            datum_rashoda: e.datum_rashoda
              ? formatDate(new Date(e.datum_rashoda))
              : "",
          })) || []
        }
      />
      {isLoading && (
        <IonSpinner name="circles" className="spinner-page-center" />
      )}
      <IonToast
        color="danger"
        message="Doslo je do greske"
        duration={3000}
        isOpen={!!error}
      />
    </>
  );
};

export default ExpensesTable;
