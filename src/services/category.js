/* eslint-disable no-useless-catch */
import instance from "../configs/axios";
import Author from "../services/baseApi/AuthorApi";
let size = 5;

export const getAllCategoryForProduct = async () => {
  try {
    let queryCategory = `/categories`;
    return await instance.get(queryCategory);
  } catch (error) {
    throw error;
  }
};

export const getAllCategory = async (page) => {
  try {
    let queryCategory = `/categories?sort=DESC&size=${size}`;
    if (page) queryCategory += `&page=${page}`;
    return await instance.get(queryCategory);
  } catch (error) {
    throw error;
  }
};

export const getCategoryById = async (category) => {
  try {
    console.log(category);
    const response = await instance.get(`/categories/${category.id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
