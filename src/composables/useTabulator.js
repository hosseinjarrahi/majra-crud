import { TabulatorFull as Tabulator } from "tabulator-tables"; //import Tabulator library

let tableInstance;

const initTable = (
  { element, headers, data } = { element: null, headers: [], data: [] }
) => {
  tableInstance = new Tabulator(element, {
    data,
    height: "400px",
    columns: headers,
  });
};

export function useTabulator() {
  return {
    initTable,
    tableInstance,
  };
}
