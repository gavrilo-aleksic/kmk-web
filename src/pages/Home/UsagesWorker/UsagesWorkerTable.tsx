import { useQuery } from "react-query";
import { getUsagesWorkerFn } from "../../../api/api";
import { IonSpinner, IonToast } from "@ionic/react";
import { AgGridReact } from "ag-grid-react";
import { UsagesWorkerQueryModel } from "../../../api/types";

const numericCellWidth = 110;

const columnDefs: any = [
  {
    field: "ime_i_prezime_radnika",
    headerName: "Ime i prezime",
  },
  {
    field: "cas",
    headerName: "Čas",
    type: "numericColumn",
    width: numericCellWidth - 20,
  },
  {
    field: "cas_cena",
    headerName: "Cena Čas",
    type: "numericColumn",
    width: numericCellWidth,
  },
  {
    field: "ucinak",
    headerName: "Učinak",
    type: "numericColumn",
    width: numericCellWidth,
  },
  {
    field: "cena_ucinak",
    headerName: "Cena Učinak",
    type: "numericColumn",
    width: numericCellWidth + 50,
  },
  {
    field: "pov_ucinak",
    headerName: "Pov Učinak",
    type: "numericColumn",
    width: numericCellWidth,
  },
  {
    field: "zastoj",
    headerName: "Zastoj",
    type: "numericColumn",
    width: numericCellWidth - 20,
  },
  {
    field: "id_rashodi_radnici",
    headerName: "ID",
  },
];

const UsagesWorkerTable = ({
  id,
  onSelectChange,
}: {
  id?: number;
  onSelectChange: (e: UsagesWorkerQueryModel) => void;
}) => {
  const { data, error, isLoading } = useQuery(
    ["USAGES_WORKER", id],
    () => getUsagesWorkerFn(id!!),
    { enabled: !!id }
  );
  const rowData = data?.data || [];

  return (
    <div className="ag-theme-quartz" style={{ height: 300, width: "100%" }}>
      <AgGridReact
        suppressMovableColumns
        suppressNoRowsOverlay={isLoading}
        rowSelection="single"
        onRowSelected={(row: any) => {
          if (!row.node.selected) return;
          onSelectChange(
            data?.data.find(
              (e) => e.id_rashodi_radnici === row.data?.id_rashodi_radnici
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

export default UsagesWorkerTable;
