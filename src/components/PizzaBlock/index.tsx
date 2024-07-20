import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addPizza, increment, decrement, selectCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

type PizzaBlockProps ={
id:string;
title:string;
price: number;
imageUrl: string;
sizes:number[];
types:number[];
}

const PizzaBlock:React.FC<PizzaBlockProps>=({ id, title, price, imageUrl, sizes, types }) =>{

  const [activeSize, setActiveSize] = React.useState(0);
  const [activeTypePizza, setActiveTypePizza] = React.useState(0);
  const typePizza = ['тонкое', 'традиционное'];

  const cart = useSelector(selectCart);

  const dispatch = useDispatch();

  const pizzaItemInCart = {
    id,
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

  const handleAddToCart = (arr) => {};

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

  const handlePlus = () => {
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
  const handleMinus = () => {
    const index = cart.findIndex(
      (item) =>
        item.title === title &&
        item.size === sizes[activeSize] &&
        item.dough === typePizza[activeTypePizza],
    );
    dispatch(decrement(index));
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
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>{typePizzaDoughList}</ul>
          <ul>{sizesList}</ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price"> {price} ₽</div>
          {getQtyAddedPizza(cart) === 0 ? (
            <button className="button button--outline button--add" onClick={handlePlus}>
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
            </button>
          ) : (
            <div className="button button--after-added">
              <div className="cart__item-count">
                <div
                  className="button button--outline button--circle cart__item-count-minus"
                  onClick={handleMinus}>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                      fill="#EB5A1E"
                    />
                    <path
                      d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                      fill="#EB5A1E"
                    />
                  </svg>
                </div>
                <b>{getQtyAddedPizza(cart)}</b>
                <button
                  className="button button--outline button--circle cart__item-count-plus"
                  onClick={handlePlus}>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                      fill="#EB5A1E"
                    />
                    <path
                      d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                      fill="#EB5A1E"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;