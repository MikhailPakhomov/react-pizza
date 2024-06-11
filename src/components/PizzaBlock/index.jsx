import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addPizza, increment } from './../../redux/slices/cartSlice';

export default function PizzaBlock({ title, price, imageUrl, sizes, types }) {
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeTypePizza, setActiveTypePizza] = React.useState(0);
  const typePizza = ['тонкое', 'традиционное'];

  const cart = useSelector((state) => state.cart.pizzas);

  const dispatch = useDispatch();

  const pizzaItemInCart = {
    imageUrl,
    title,
    price,
    size: sizes[activeSize],
    dough: typePizza[activeTypePizza],
    count: 0,
  };

  const handleClickSize = (index) => {
    setActiveSize(index);
  };

  const handleClickTypePizza = (index) => {
    setActiveTypePizza(index);
  };

  const handleAddToCart = (arr) => {
    const index = cart.findIndex(
      (item) =>
        item.title === title &&
        item.size === sizes[activeSize] &&
        item.dough === typePizza[activeTypePizza],
    );

    if (index === -1) {
      pizzaItemInCart.count += 1;
      dispatch(addPizza(pizzaItemInCart));
      return;
    } else {
      dispatch(increment(index));
      return;
    }
  };

  const getQtyAddedPizza = (arr) => {
    const result = arr.find(
      (item) =>
        item.title === title &&
        item.size === sizes[activeSize] &&
        item.dough === typePizza[activeTypePizza],
    );
    if (!result) return 0;
    return result.count;
  };
  const sizesList = sizes.map((size, index) => {
    return (
      <li
        key={uuidv4()}
        className={index === activeSize ? 'active' : ''}
        onClick={() => handleClickSize(index)}>
        {size} см.
      </li>
    );
  });

  const typePizzaDoughList = types.map((typeId, index) => {
    return (
      <li
        key={uuidv4()}
        className={index === activeTypePizza ? 'active' : ''}
        onClick={() => {
          handleClickTypePizza(index);
        }}>
        {typePizza[typeId]}
      </li>
    );
  });

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>{typePizzaDoughList}</ul>
          <ul>{sizesList}</ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price"> {price} ₽</div>
          <button className="button button--outline button--add" onClick={handleAddToCart}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{getQtyAddedPizza(cart)}</i>
          </button>
        </div>
      </div>
    </div>
  );
}
