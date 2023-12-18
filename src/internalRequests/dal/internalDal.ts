import { b } from "vitest/dist/reporters-5f784f42";
import { client } from "../../dbAccess/postgresConnection";
import { insertQGenerator, updateQGenerator } from "../helpers/queryGenerators";
import { productEntriesType } from "../types/productEntriesType";
import queries from "../utils/queries";

export const sendGetAllProductsQuery = async () => {
  try {
    const data = await client.query(queries.getAllProductsQ);
    return data.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendGetProductByIdQuery = async (id: string) => {
  try {
    const data = await client.query(queries.getProductByIdQ + id);
    return data.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendAddProductQuery = async (
  productEntries: productEntriesType
) => {
  try {
    const query = insertQGenerator(productEntries);
    const data = await client.query(query);
    return data.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendUpdateProductQuery = async (
  id: string,
  entries: productEntriesType
) => {
  try {
    const query = updateQGenerator(id, entries);
    const data = await client.query(query);
    return data.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendDeleteProductQuery = async (id: string) => {
  try {
    const deleting = await client.query(
      queries.deleteProductByIdQ + id + "RETURNING *"
    );
    return deleting.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMyProductsQuery = async (by: string) => {
  try {
    const query = `SELECT * FROM products WHERE "createdBy" ILIKE '${by}'`;

    const products = await client.query(query);
    if (!products.rows.length)
      throw new Error(
        "To view the products you have added, you must add products first"
      );

    return products.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendUpdateQuantityQuery = async (id: string, quantity: number) => {
  try {
    const query =
      queries.updateQuantityQ +
      quantity.toString() +
      "WHERE id=" +
      id +
      "RETURNING *;";
    const updateProduct = await client.query(query);
    return updateProduct.rows;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
