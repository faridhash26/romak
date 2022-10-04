import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import Pagination from "../components/pureelements/Paginations";

const service = "https://dummyjson.com/auth/products";
const columnDefs = [
  { field: "id", filter: true, floatingFilter: true },
  { field: "title", filter: true, floatingFilter: true },
  { field: "description", filter: true, floatingFilter: true },
  { field: "price", filter: true, floatingFilter: true },
  { field: "discountPercentage" },
];
const Dashboard = () => {
  const gridRef = useRef();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState();
  const [pagination, setPagination] = useState({ total: 0, current: 0 });

  const currentPage = pagination.current;

  const handleGetProducts = useCallback(
    async (token) => {
      try {
        setLoading(true);
        const AuthStr = "Bearer ".concat(token);
        const res = await axios.get(service, {
          headers: { Authorization: AuthStr },
          params: { limit: 10, skip: currentPage },
        });
        setProductsData(res.data);
        setPagination({ total: res.data.total, current: +res.data.skip });
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    if (token) {
      handleGetProducts(token);
    }
  }, [handleGetProducts, token]);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "80%" }}>
      <AgGridReact
        ref={gridRef}
        rowData={productsData?.products}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true }}
        animateRows={true}
        rowSelection="multiple"
      />
      <Pagination
        setPagination={setPagination}
        pagination={pagination}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
