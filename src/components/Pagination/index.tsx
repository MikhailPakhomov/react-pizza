import ReactPaginate from 'react-paginate';
import React from 'react';
import styles from './Pagination.module.scss';
import { useDispatch } from 'react-redux';
import { setParams } from '../../redux/slices/queryParamsSlice';

type PaginationProps = {
  category?: string;
  sortBy?: string;
  order?: string;
  search?: string;
  limit?: string;
  page?: string;
};
const Pagination: React.FC<PaginationProps> = ({
  category,
  sortBy,
  order,
  search,
  page,
  limit,
}) => {
  const params: PaginationProps = {
    category,
    sortBy,
    order,
    search,
    page,
    limit,
  };

  const dispath = useDispatch();

  const onChangePage = (selectedPage: string) => {
    params.page = selectedPage;
    dispath(setParams(params));
  };
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      forcePage={params.page ? +params.page-1 : 1}
      onPageChange={(event) => onChangePage((event.selected + 1).toString())}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
