import { useParams } from 'react-router';
import { getPizzaById } from '../../api/fetch';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import { v4 as uuidv4 } from 'uuid';

const FullPizza = () => {
  const { id } = useParams();

  const { data, isFetching, isError } = useQuery({
    queryKey: ['pizzaById'],
    queryFn: () => {
      if(id){
        return getPizzaById(id);
      }
    },
  });
  if (data) {
    console.log(data);
    return (
      <div className="container">
        <img src={data.imageUrl} alt="pizza"></img>
        <h2>{data.title}</h2>
        <p>рейтинг: {data.rating}</p>
        <h3>{data.price} ₽</h3>
      </div>
    );
  }

  if (isFetching) {
    return <Skeleton key={uuidv4()} />;
  }

  if (isError) {
    return (
      <div className="content__error-info">
        <h2>Произошла ошибка</h2>
        <p>Не удалось загрузить карточку с пиццей</p>
      </div>
    );
  }
};

export default FullPizza;
