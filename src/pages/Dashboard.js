import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";

const Dashboard = () => {
  const [productsData, setProductsData] = useState();
  var token = localStorage.getItem("token");

  const handleGetProducts = async (token) => {
    try {
      const AuthStr = "Bearer ".concat(token);
      const res = await axios.get("https://dummyjson.com/auth/products", {
        headers: { Authorization: AuthStr },
      });
      setProductsData(res.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (token) {
      handleGetProducts(token);
    }
  }, []);
  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", filter: true, floatingFilter: true },
    { field: "title", filter: true, floatingFilter: true },
    { field: "description", filter: true, floatingFilter: true },
    { field: "price", filter: true, floatingFilter: true },
    { field: "discountPercentage" },
  ]);
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  console.log(productsData?.products);
  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "100%" }}>
      <AgGridReact
        ref={gridRef}
        rowData={productsData?.products}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowSelection="multiple"
        onCellClicked={cellClickedListener}
      />
    </div>
  );
};

export default Dashboard;
