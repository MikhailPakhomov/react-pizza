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

type ParamsItem = {
  category?: string;
  sortBy?: string;
  order?: string;
  search?: string;
  page?: string;
  limit?: string;
};

const Home: React.FC = () => {
  const initialParams: ParamsItem = useSelector(selectQueryParams);

  const params: ParamsItem = {
    category: initialParams.category ?? '',
    sortBy: initialParams.sortBy,
    order: initialParams.order,
    search: initialParams.search,
    page: initialParams.page,
    limit: initialParams.limit,
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

  type PizzaBlockProps = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
  };

  if (data) {
    var pizzaBlockList = data?.map((item: PizzaBlockProps) => {
      return <PizzaBlock key={uuidv4()} {...item} />;
    });
  }

  if (isError) {
    console.log('Ошибка при получении пицц', error);
  }

  const sceletons = [...new Array(4)].map(() => <Skeleton key={uuidv4()} />);

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
        <Categories
          category={params.category}
          sortBy={params.sortBy}
          order={params.order}
          search={params.search}
          page={params.page}
        />
        <Sort {...params} />
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

      <Pagination {...params} />
    </>
  );
};

export default Home;
