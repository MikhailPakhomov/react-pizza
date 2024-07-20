import ReactPaginate from 'react-paginate';
import React from 'react';
import styles from './Pagination.module.scss';
import { useDispatch } from 'react-redux';
import { setParams } from '../../redux/slices/queryParamsSlice';

type PaginationProps = {
  category: number | string;
  sortBy:string;
  order:string;
  search:string;
  limit: number;
  page: number;
}
const Pagination:React.FC<PaginationProps> = ({category, sortBy, order, search, limit, page}) => {

  const params:PaginationProps = {
category,
sortBy,
order,
search,
limit,
page
}

  const dispath = useDispatch();

  const onPageChange = (event) => {
    params.page = event.selected + 1;
    dispath(setParams(params));
  };
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      forcePage={params.page - 1}
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;