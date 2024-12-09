import UnAuthor from "./baseApi/UnAuthorApi";

export const getAllSize = async () => {
  const res = await UnAuthor.get(`/sizes`);
  return res;
};
