import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Categories({ setFilterParams }) {
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
    setFilterParams(index);
  };
  return (
    <div className="categories">
      <ul>{categoriesList}</ul>
    </div>
  );
}
