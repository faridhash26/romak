import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", filter: true },
    { field: "title", filter: true },
    { field: "description" },
    { field: "price" },
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
        ref={gridRef} // Ref for accessing Grid's API
        rowData={productsData?.products} // Row Data for Rows
        columnDefs={columnDefs} // Column Defs for Columns
        defaultColDef={defaultColDef} // Default Column Properties
        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        rowSelection="multiple" // Options - allows click selection of rows
        onCellClicked={cellClickedListener} // Optional - registering for Grid Event
      />
    </div>
  );
};

export default Dashboard;
