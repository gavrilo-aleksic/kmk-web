import { useQuery } from "react-query";
import { getExpensesFn } from "../../../api/api";
import DataGrid from "react-data-grid";
import { IonSpinner, IonToast } from "@ionic/react";
import { formatDate } from "../../../utils/format/date";

const ExpensesTable = ({ from, to }: { from: Date; to: Date }) => {
  const { data, isLoading, error } = useQuery(["EXPENSES", from, to], () =>
    getExpensesFn(from, to)
  );

  return (
    <>
      <DataGrid
        style={{ zoom: 0.8 }}
        columns={[
          { key: "id_rashoda", name: "ID" },
          { key: "datum_rashoda", name: "Datum" },
          { key: "naziv_parcele", name: "Parcela" },
          { key: "naziv_masine", name: "Masina" },
          { key: "sifra_kulture", name: "Kultura" },
          { key: "naziv_operacije", name: "Operacija" },
        ]}
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
