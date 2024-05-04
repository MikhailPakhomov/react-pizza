import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

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
          <div className="content__items">
            <PizzaBlock title={'Мексиканская'} price={420} />
            <PizzaBlock title={'Пепперони'} price={555} />
            <PizzaBlock title={'Деревенская'} price={360} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
