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

import { setFilterParams } from '../../redux/slices/filterSlice';
import { setSortParams } from '../../redux/slices/sortSlice';
import { setCurrentPage } from '../../redux/slices/paginationSlice';

const getPizzas = async (params, changeUrl, navigate) => {
  changeUrl(params, navigate);
  const { data } = await axios.get('https://6637b4ab288fedf693811aff.mockapi.io/items', { params });
  return data;
};

export default function Home() {
  const searchValue = useSelector((state) => state.search.value);
  // const filterParams = useSelector((state) => state.filter.value);
  // const sortParams = useSelector((state) => state.sort);
  const currentPage = useSelector((state) => state.pagination.currentPage);

  const [filter, setFilter] = React.useState('');
  const [sortParams, setSort] = React.useState({ sortBy: 'rating', order: 'desc' });

  const params = {
    category: filter ?? '',
    sortBy: sortParams.sortBy,
    order: sortParams.order,
    search: searchValue,
    limit: 4,
    page: currentPage,
  };

  const changeUrl = (params, setUrl) => {
    console.log(params);
    let urlParams = new URLSearchParams('');
    console.log(urlParams.toString());
    for (let key in params) {
      urlParams.append(key, params[key]);
    }
    setUrl('?' + urlParams.toString());
  };
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     dispatch(setFilterParams(Number(params.filterParams)));
  //     refetch();
  //     // dispatch(setSortParams(params.setSortParams));
  //     // dispatch(setCurrentPage(params.setCurrentPage));
  //   }
  // }, []);

  const navigate = useNavigate();

  const { data, isFetching, isSuccess, refetch } = useQuery({
    queryKey: ['items'],
    queryFn: () => {
      return getPizzas(params, changeUrl, navigate);
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
    changeUrl(params, navigate);
  }, [filter, sortParams, searchValue, currentPage]);

  // React.useEffect(() => {
  //   const params = new URLSearchParams(
  //     window.location.search,
  //     // 'category': filter,
  //     // 'sortBy': sortParams.sortBy,
  //     // 'order': sortParams.order,
  //     // 'currentPage': currentPage,
  //     // 'search': searchValue,
  //   );
  //   // navigate('?' + params.toString());

  // }, [filter, sortParams, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories setFilter={setFilter} />
        <Sort setSort={setSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isFetching ? sceletons : pizzaBlockList}</div>
      <Pagination currentPage={currentPage} />
    </>
  );
}
