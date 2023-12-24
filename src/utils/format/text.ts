export const trimCellData = (row: any) =>
  typeof row.value === "string" ? row.value.trim() : row.value;
