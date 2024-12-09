/* eslint-disable no-useless-catch */
import UnAuthor from "./baseApi/UnAuthorApi";
let size = 1000;

export const getAllCategoryForProduct = async () => {
  try {
    let queryCategory = `/categories`;
    return await UnAuthor.get(queryCategory);
  } catch (error) {
    throw error;
  }
};

export const getAllCategory = async (page) => {
  try {
    let queryCategory = `/categories?sort=DESC&size=${size}`;
    if (page) queryCategory += `&page=${page}`;
    return await UnAuthor.get(queryCategory);
  } catch (error) {
    throw error;
  }
};

export const getCategoryById = async (category) => {
  try {
    const response = await UnAuthor.get(`/categories/${category.id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
