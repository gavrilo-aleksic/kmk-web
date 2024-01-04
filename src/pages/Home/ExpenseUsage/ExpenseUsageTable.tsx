import { useQuery } from "react-query";
import { getUsagesFn } from "../../../api/api";
import { IonSpinner, IonToast } from "@ionic/react";
import { AgGridReact } from "ag-grid-react";
import { ExpenditureQueryModel } from "../../../api/types";

const columnDefs: any = [
  {
    field: "naziv_utroska",
    headerName: "Utrosak",
  },
  {
    field: "kolicina_utroska",
    headerName: "Kolicina",
    type: "numericColumn",
    width: "auto",
  },
];

const ExpenseUsageTable = ({
  utrosakId,
  onSelectChange,
}: {
  utrosakId?: number;
  onSelectChange: (e: ExpenditureQueryModel) => void;
}) => {
  const { data, error, isLoading } = useQuery(
    ["USAGES", utrosakId],
    () => getUsagesFn(utrosakId!!),
    { enabled: !!utrosakId }
  );
  const rowData = data?.data || [];

  return (
    <div
      className="ag-theme-quartz"
      style={{ height: 300, width: "100%", zoom: "0.9" }}
    >
      <AgGridReact
        suppressMovableColumns
        suppressNoRowsOverlay={isLoading}
        rowSelection="single"
        onRowSelected={(row: any) => {
          if (!row.node.selected) return;
          onSelectChange(
            data?.data.find(
              (e) => e.id_rashodi_utrosci === row.data?.id_rashodi_utrosci
            )!!
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
  );
};

export default ExpenseUsageTable;
