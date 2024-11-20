import Author from "./baseApi/AuthorApi";

export const getCart = async () => {
  try {
    const response = await Author.get(`/carts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (data) => {
  try {
    console.log(data);
    const response = await Author.post(`/carts`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCart = async (data) => {
  try {
    const response = await Author.put(`/carts/${data.id}`, {
      quantity: data.quantity,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteCart = async (id) => {
  try {
    const response = await Author.delete(`/carts/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
