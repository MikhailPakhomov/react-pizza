import React from 'react';
import Categories from '../../components/Categories';
import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import Sort from '../../components/Sort';
import axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import Pagination from '../../components/Pagination';
import { PageContext } from '../../App';
import { useSelector } from 'react-redux';

const getPizzas = async (filterParams, sortParams, searchValue, page) => {
  if (!filterParams) {
    const { data } = await axios.get('https://6637b4ab288fedf693811aff.mockapi.io/items', {
      params: {
        sortBy: sortParams.sortBy,
        order: sortParams.order,
        search: searchValue,
        limit: 4,
        page: page,
      },
    });
    return data;
  } else {
    const { data } = await axios.get('https://6637b4ab288fedf693811aff.mockapi.io/items', {
      params: {
        category: filterParams,
        sortBy: sortParams.sortBy,
        order: sortParams.order,
        search: searchValue,
        limit: 4,
        page: page,
      },
    });
    return data;
  }
};

export default function Home() {
  const searchValue = useSelector((state) => state.search.value);
  const filterParams = useSelector((state) => state.filter.value);

const sortParams = useSelector((state) => state.sort)
  // const sortBy = useSelector((state) => state.sort.sortBy);
  // const order = useSelector((state) => state.sort.order);



  const { page, setPage } = React.useContext(PageContext);

  const { data, isFetching, isSuccess, refetch } = useQuery({
    queryKey: ['items'],
    queryFn: () => {
      return getPizzas(filterParams, sortParams, searchValue, page);
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
  }, [filterParams, sortParams, searchValue, page]);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isFetching ? sceletons : pizzaBlockList}</div>
      <Pagination setPage={setPage} />
    </>
  );
}
