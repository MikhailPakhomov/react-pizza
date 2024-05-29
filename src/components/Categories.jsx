import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { setFilterParams } from '../redux/slices/filterSlice';

export default function Categories() {
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const categoriesList = categories.map((category, index) => {
    return (
      <li
        key={uuidv4()}
        onClick={(event) => handleClickCategory(index, event)}
        className={activeIndex === index ? 'active' : ''}>
        {category}
      </li>
    );
  });

  const handleClickCategory = (index) => {
    setActiveIndex(index);
    dispatch(setFilterParams(index));
  };
  return (
    <div className="categories">
      <ul>{categoriesList}</ul>
    </div>
  );
}
