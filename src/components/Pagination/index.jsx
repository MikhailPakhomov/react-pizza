import ReactPaginate from 'react-paginate';
import React from 'react';
import styles from './Pagination.module.scss';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/paginationSlice';
import { current } from '@reduxjs/toolkit';

export default function Pagination({ currentPage, setCurrentPage }) {
  const dispath = useDispatch();

  const onPageChange = (event) => {
    setCurrentPage(event.selected + 1);
  };
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      forcePage={currentPage - 1}
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
