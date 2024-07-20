import React from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { setParams } from '../redux/slices/queryParamsSlice';
import { useClickAway } from '@uidotdev/usehooks';

type SortProps = {
  category: number | string;
  sortBy:string;
  order:string;
  search:string;
  limit: number;
  page: number;
}
const Sort:React.FC<SortProps> = ({ category, sortBy, order, search, limit, page }) =>{

const params:SortProps = {
  category, sortBy, order, search, limit, page
}
  const ref = useClickAway<HTMLDivElement>(() => {
    setIsVisible(false);
  });

  const [isVisible, setIsVisible] = React.useState(false);
  const [sortActiveIndex, setSortActiveIndex] = React.useState(0);
  const dispath = useDispatch();

type SortItem = {
 name: string;
sortBy: string;
order: string;
}

  const sortTypes:SortItem[]= [
    {
      name: 'популярности',
      sortBy: 'rating',
      order: 'desc',
    },
    {
      name: 'цене (сначала дорогие)',
      sortBy: 'price',
      order: 'desc',
    },
    {
      name: 'цене (сначала дешёвые)',
      sortBy: 'price',
      order: 'ask',
    },
    {
      name: 'алфавиту (А-я)',
      sortBy: 'title',
      order: 'ask',
    },
    {
      name: 'алфавиту (Я-а)',
      sortBy: 'title',
      order: 'desc',
    },
  ];

  const selectedSortType = sortTypes?.find(
    (obj:SortItem) => obj.sortBy === params.sortBy && obj.order === params.order,
  )?.name;
  const sortTypesList = sortTypes.map((type, index) => {
    return (
      <li
        key={uuid()}
        className={index === sortActiveIndex ? 'active' : ''}
        onClick={() => {
          handleClickSortTypes(index, type.sortBy, type.order);
        }}>
        {type.name}
      </li>
    );
  });

  const handleClickSortTypes = (index:number, sortBy:string, order:string) => {
    params.sortBy = sortBy;
    params.order = order;

    setSortActiveIndex(index);
    setIsVisible(!isVisible);
    dispath(setParams(params));
  };

  return (
    <div className="sort" ref={ref}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            setIsVisible(!isVisible);
          }}>
          {selectedSortType}
        </span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>{sortTypesList}</ul>
        </div>
      )}
    </div>
  );
}

export default Sort;