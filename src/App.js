import React, { useEffect } from 'react';
import axios from 'axios';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Skeleton from './components/PizzaBlock/Skeleton';
import Sort from './components/Sort';
import './scss/app.scss';
import { v4 as uuidv4 } from 'uuid';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

function App() {
  const [items, setItems] = React.useState([]);
  const [isloading, setIsLoading] = React.useState(true);

  //запрос на бэк штатными средствами
  // useEffect(()=> {
  //   fetch('https://6637b4ab288fedf693811aff.mockapi.io/items')
  //   .then((response) => response.json())
  //   .then((data) => setItems(data));
  // }, [])

  //запрос на бэк через Axios
  // useEffect(() => {
  //   axios
  //     .get('https://6637b4ab288fedf693811aff.mockapi.io/items')
  //     .then((response) => {
  //       setItems(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  //запрос на бэкчерез React Query

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
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
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
        </div>
      </div>
    </div>
  );
}

export default App;
