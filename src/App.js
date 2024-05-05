import React from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [items, setItems] = React.useState([]);
  const pizzaBlockList = items.map((item, index) => {
    return <PizzaBlock key={uuidv4()} {...item} />;
  });

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
          <div className="content__items">{pizzaBlockList}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
