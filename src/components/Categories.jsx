import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterParams } from '../redux/slices/filterSlice';
import { setCurrentPage } from '../redux/slices/paginationSlice';

export default function Categories({ setFilter }) {
  const filterParams = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const categoriesList = categories.map((category, index) => {
    return (
      <li
        key={uuidv4()}
        onClick={(event) => handleClickCategory(index, event)}
        className={filterParams === index ? 'active' : ''}>
        {category}
      </li>
    );
  });

  const handleClickCategory = (index) => {
    setActiveIndex(index);
    dispatch(setFilterParams(index));
    dispatch(setCurrentPage(1));
    setFilter(index || '');
  };
  return (
    <div className="categories">
      <ul>{categoriesList}</ul>
    </div>
  );
}
