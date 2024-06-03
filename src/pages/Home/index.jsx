import React from 'react';
import Categories from '../../components/Categories';
import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import Sort from '../../components/Sort';
import axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import Pagination from '../../components/Pagination';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { setFilterParams } from '../../redux/slices/filterSlice';
import { setSortParams } from '../../redux/slices/sortSlice';
import { setCurrentPage } from '../../redux/slices/paginationSlice';

const getPizzas = async (params) => {
  const { data } = await axios.get('https://6637b4ab288fedf693811aff.mockapi.io/items', { params });
  return data;
};

export default function Home() {
  const initialParams = qs.parse(window.location.search.substring(1));
  console.log(initialParams);
  if (Object.keys(initialParams).length === 0) {
    initialParams.category = '';
    initialParams.sortBy = 'rating';
    initialParams.order = 'desc';
    initialParams.search = '';
    initialParams.limit = 4;
    initialParams.page = 1;
  }

  const searchValue = useSelector((state) => state.search.value);
  const [currentPage, setCurrentPage] = React.useState(initialParams.page);
  const [filter, setFilter] = React.useState(initialParams.category);
  const [sortParams, setSort] = React.useState({
    sortBy: initialParams.sortBy,
    order: initialParams.order,
  });
  const params = {
    category: filter ?? '',
    sortBy: sortParams.sortBy,
    order: sortParams.order,
    search: searchValue,
    limit: 4,
    page: currentPage,
  };

  const [searchParams, setParams] = useSearchParams();

  const navigate = useNavigate();

  const { data, isFetching, isSuccess, refetch } = useQuery({
    queryKey: ['items'],
    queryFn: () => {
      return getPizzas(params);
    },
  });

  if (data) {
    var pizzaBlockList = data.map((item, index) => {
      return <PizzaBlock key={uuidv4()} {...item} />;
    });
  }

  const sceletons = [...new Array(4)].map((_, index) => <Skeleton key={uuidv4()} />);
  React.useEffect(() => {
    refetch();
    setParams(params);
  }, [filter, sortParams, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories filter={filter} setFilter={setFilter} setCurrentPage={setCurrentPage}/>
        <Sort setSort={setSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isFetching ? sceletons : pizzaBlockList}</div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}
