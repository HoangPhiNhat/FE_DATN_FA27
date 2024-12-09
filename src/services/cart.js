import Author from "./baseApi/AuthorApi";

const handleUnauthorized = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

export const getCart = async () => {
  try {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      handleUnauthorized();
      return [];
    }

    const response = await Author.get(`/carts`);
    return response.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      handleUnauthorized();
      return [];
    }
    throw error;
  }
};

export const addToCart = async (data) => {
  try {
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
