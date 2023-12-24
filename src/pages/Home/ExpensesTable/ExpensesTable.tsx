import { useQuery } from "react-query";
import { getExpensesFn } from "../../../api/api";
import { IonSpinner, IonToast } from "@ionic/react";
import { formatDate } from "../../../utils/format/date";
import { ExpenseQueryModel } from "../../../api/types";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import { trimCellData } from "../../../utils/format/text";

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

  const rowData =
    data?.data.map((e) => ({
      ...e,
    })) || [];

  return (
    <div
      className="ag-theme-quartz"
      style={{ height: 500, width: "100%", zoom: "0.8" }}
    >
      <AgGridReact
        columnDefs={[
          {
            field: "id_rashoda",
            headerName: "ID",
            width: 100,
          },
          {
            field: "datum_rashoda",
            headerName: "Datum",
            valueFormatter: (e) => formatDate(new Date(e.value)),
            width: 150,
            cellDataType: "date",
            editable: true,
          },
          {
            field: "naziv_parcele",
            headerName: "Parcela",
            editable: true,
            valueFormatter: trimCellData,
          },
          {
            field: "naziv_masine",
            headerName: "Masina",
            valueFormatter: trimCellData,
          },
          {
            field: "sifra_kulture",
            headerName: "Kultura",
            valueFormatter: trimCellData,
          },
          {
            field: "naziv_operacije",
            headerName: "Operacija",
            valueFormatter: trimCellData,
          },
        ]}
        rowData={rowData}
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
    </div>
  );
};

export default ExpensesTable;
