import ReactPaginate from 'react-paginate';
import React from 'react';
import styles from './Pagination.module.scss';

export default function Pagination({ setPage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => {
        setPage(event.selected + 1);
      }}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
