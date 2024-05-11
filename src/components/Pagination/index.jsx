import ReactPaginate from 'react-paginate';
import React from 'react';
import styles from './Pagination.module.scss';
export default function Pagination() {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => {
        console.log(event);
      }}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
