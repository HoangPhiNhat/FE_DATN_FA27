/* eslint-disable no-useless-catch */
import instance from "../configs/axios";
import Author from "../services/baseApi/AuthorApi";

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

export const removeProduct = async (id) => {
  try {
    console.log(id);
    const response = await Author.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
