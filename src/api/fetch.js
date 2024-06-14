import axios from "axios";

export const getPizzas =  async (params) => {
    const { data } = await axios.get('https://6637b4ab288fedf693811aff.mockapi.io/items', {
      params,
    });
    return data;
  };