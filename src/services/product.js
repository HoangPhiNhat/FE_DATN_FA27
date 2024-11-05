import instance from "../configs/axios";

let size = 5;

export const getProductAll = async (page, name) => {
  try {
    const response = await instance.get(
      `/products?name=${name}&page=${page}&size=${size}&sort=DESC`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    console.log(id);
    const response = await instance.get(`/products/${id}/show`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
