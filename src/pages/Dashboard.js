import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";

const Dashboard = () => {
  const getRowId = useMemo(() => {
    return (params) => params.data.id;
  }, []);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Row ID", valueGetter: "node.id" },
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);
  const [rowData, setRowData] = useState([
    { id: "c1", make: "Toyota", model: "Celica", price: 35000 },
    { id: "c2", make: "Ford", model: "Mondeo", price: 32000 },
    { id: "c8", make: "Porsche", model: "Boxster", price: 72000 },
    { id: "c4", make: "BMW", model: "M50", price: 60000 },
    { id: "c14", make: "Aston Martin", model: "DBX", price: 190000 },
  ]);

  const handleGetProducts = () => {};
  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <div>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        getRowId={getRowId}
      ></AgGridReact>
    </div>
  );
};

export default Dashboard;
