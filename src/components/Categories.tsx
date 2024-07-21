import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { setParams } from '../redux/slices/queryParamsSlice';

type CategoriesProps = {
  category: number | string;
  sortBy: string;
  order: string;
  search: string;
  page: number;
};
const Categories: React.FC<CategoriesProps> = ({ category, sortBy, order, search, page }) => {
  const params: CategoriesProps = {
    category,
    sortBy,
    order,
    search,
    page,
  };
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const categoriesList = categories.map((category, index) => {
    return (
      <li
        key={uuidv4()}
        onClick={() => handleClickCategory(index)}
        className={Number(params.category) === index ? 'active' : ''}>
        {category}
      </li>
    );
  });

  const handleClickCategory = (index: number) => {
    params.category = index || '';
    params.page = 1;
    setActiveIndex(index);
    dispatch(setParams(params));
  };
  return (
    <div className="categories">
      <ul>{categoriesList}</ul>
    </div>
  );
};

export default Categories;
