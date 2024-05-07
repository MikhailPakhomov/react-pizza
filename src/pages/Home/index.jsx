import React from 'react';
import Categories from '../../components/Categories';
import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import Sort from '../../components/Sort';
import axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

const getPizzas = async () => {
  const { data } = await axios.get('https://6637b4ab288fedf693811aff.mockapi.io/items');
  return data;
};

export default function Home() {
  const [filterParams, setFilterParams] = React.useState(0);
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['items'],
    queryFn: () => {
      return getPizzas(filterParams);
    },
  });
  if (data) {
    if (filterParams === 0) {
      var pizzaBlockList = data.map((item, index) => {
        return <PizzaBlock key={uuidv4()} {...item} />;
      });
    } else {
      var pizzaBlockList = data
        .filter((item) => item.category === filterParams)
        .map((item) => {
          return <PizzaBlock key={uuidv4()} {...item} />;
        });
    }
  }

  return (
    <>
      <div className="content__top">
        <Categories setFilterParams={setFilterParams} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isFetching
          ? [...new Array(6)].map((_, index) => <Skeleton key={uuidv4()} />)
          : pizzaBlockList}
      </div>
    </>
  );
}
