import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginations = (props) => {
  const pageNumberSetGenerator = (totalPages) => {
    let numberSet = [];
    for (let i = 1; i <= totalPages; i++) {
      numberSet.push(i);
    }
    return numberSet;
  };
  const handleChangePage = (pageNumber) => {
    props.setPagination((prev) => {
      return { ...prev, current: pageNumber * 10 - 10 };
    });
  };
  const handleNextPage = () => {
    props.setPagination((prev) => {
      return {
        ...prev,
        current: prev.current + 10,
      };
    });
  };
  const handlePrevPage = () => {
    props.setPagination((prev) => {
      return {
        ...prev,
        current: prev.current - 10,
      };
    });
  };

  return (
    <Pagination>
      <Pagination.Prev onClick={handlePrevPage} disabled={props.loading} />
      {pageNumberSetGenerator(props?.pagination?.total / 10).map((item) => (
        <Pagination.Item
          disabled={props.loading}
          active={item - 1 === props?.pagination?.current / 10}
          key={item}
          onClick={() => handleChangePage(item)}
        >
          {item}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={handleNextPage} disabled={props.loading} />
    </Pagination>
  );
};

export default Paginations;
