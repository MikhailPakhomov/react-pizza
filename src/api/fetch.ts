import axios from 'axios';

type QueryParams = {
  category?: string;
  sortBy?: string;
  order?: string;
  search?: string;
  limit?: string;
  page?: string;
}

// type Pizzas = {
//   id?: string;
//   category?:number;
//   imageUrl?: string;
//   title?: string;
//   price?: number;
//   size?: number;
//   dough?: string;
// rating?: number
//   count?: number;
// }
export const getPizzas = async (params:QueryParams) => {
  const { data } = await axios.get('https://6637b4ab288fedf693811aff.mockapi.io/items', {
    params,
  });
  return data;
};

export const getPizzaById = async (id:string) => {
  const { data } = await axios.get(`https://6637b4ab288fedf693811aff.mockapi.io/items/${id}`);
  return data;
};
