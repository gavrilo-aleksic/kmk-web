import { useQuery } from "react-query";
import { getExpensesFn } from "../../../api/api";
import { IonSpinner, IonToast } from "@ionic/react";
import { formatDate } from "../../../utils/format/date";
import { ExpenseQueryModel } from "../../../api/types";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import { trimCellData } from "../../../utils/format/text";
import { useMemo } from "react";

const columnDefs: any = [
  {
    field: "id_rashoda",
    headerName: "ID",
    width: 100,
  },
  {
    field: "datum_rashoda",
    headerName: "Datum",
    width: 150,
  },
  {
    field: "naziv_parcele",
    headerName: "Parcela",
  },
  {
    field: "naziv_masine",
    headerName: "Masina",
  },
  {
    field: "sifra_kulture",
    headerName: "Kultura",
  },
  {
    field: "naziv_operacije",
    headerName: "Operacija",
  },
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

  const rowData: ExpenseQueryModel[] = useMemo(
    () =>
      data?.map((e: any) => ({
        ...Object.keys(e).reduce((prev, current) => {
          return { ...prev, [current]: trimCellData(e[current]) };
        }, {}),
        datum_rashoda: formatDate(e.datum_rashoda),
      })) || [],
    [data]
  );

  return (
    <>
      <div
        className="ag-theme-quartz"
        style={{ height: 500, width: "100%", zoom: "0.8" }}
      >
        <AgGridReact
          rowSelection="single"
          onRowSelected={(row: any) => {
            if (!row.node.selected) return;
            onSelectChange(
              data?.find((e) => e.id_rashoda === row.data?.id_rashoda)!!
            );
          }}
          columnDefs={columnDefs}
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
    </>
  );
};

export default ExpensesTable;
