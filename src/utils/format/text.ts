export const trimCellData = (row: any) =>
  typeof row === "string" ? row.trim() : row;
