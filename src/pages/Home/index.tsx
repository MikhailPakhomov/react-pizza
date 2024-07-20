import React from 'react';
import Categories from '../../components/Categories';
import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import Sort from '../../components/Sort';

import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import Pagination from '../../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useSearchParams } from 'react-router-dom';

import { getPizzas } from '../../api/fetch';
import { selectQueryParams } from '../../redux/slices/queryParamsSlice';

export default function Home() {
  const initialParams = useSelector(selectQueryParams);

type ParamsItem = {
category: number | string;
sortBy:string;
order:string;
search:string;
limit: number;
page: number;
}
  const params:ParamsItem = {
    category: initialParams.category ?? '',
    sortBy: initialParams.sortBy,
    order: initialParams.order,
    search: initialParams.search,
    limit: 4,
    page: initialParams.page,
  };

  const [searchParams, setParams] = useSearchParams();

  const { data, isFetching, isSuccess, isError, error, refetch } = useQuery({
    queryKey: ['items'],
    queryFn: () => {
      if (!initialParams.search) {
        return getPizzas(params);
      } else {
        return getPizzas({ search: params.search });
      }
    },
  });

  if (data) {
    var pizzaBlockList = data?.map((item) => {
      return <PizzaBlock key={uuidv4()} {...item} />;
    });
  }

  if (isError) {
    console.log('Ошибка при получении пицц', error);
  }

  const sceletons = [...new Array(4)].map((_, index) => <Skeleton key={uuidv4()} />);

  React.useEffect(() => {
    refetch();
    setParams(params);
  }, [
    initialParams.category,
    initialParams.sortBy,
    initialParams.order,
    initialParams.search,
    initialParams.page,
  ]);

  return (
    <>
      <div className="content__top">
        <Categories category={params.category} sortBy={params.sortBy} order={params.order} search={params.search} page={params.page} />
        <Sort params {...params} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {isError ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удалось загрузить список пицц. Попробуйте позже</p>
        </div>
      ) : (
        <div className="content__items">{isFetching ? sceletons : pizzaBlockList}</div>
      )}

      <Pagination category={params.category} sortBy={params.sortBy} order={params.order} search={params.search} page={params.page} />
    </>
  );
}
