import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';
import pizzas from './assets/pizzas.json';
import { v4 as uuidv4 } from 'uuid';

const pizzaBlockList = pizzas.map((pizza, index) => {
  return <PizzaBlock key={uuidv4()} {...pizza} />;
});
function App() {
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
