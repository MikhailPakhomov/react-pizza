import Categories from '../../components/Categories';
import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import Sort from '../../components/Sort';

import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const getPizzas = async () => {
    return fetch('https://6637b4ab288fedf693811aff.mockapi.io/items').then((response) =>
      response.json(),
    );
  };
  const { data, isFetching } = useQuery({ queryKey: ['items'], queryFn: getPizzas });
  if (data) {
    var pizzaBlockList = data.map((item, index) => {
      return <PizzaBlock key={uuidv4()} {...item} />;
    });
  }
  return (
    <>
      <div className="content__top">
        <Categories />
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
