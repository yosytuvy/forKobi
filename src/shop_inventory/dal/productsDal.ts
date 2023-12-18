import { client } from "../../dbAccess/postgresConnection";
import ServerError from "../../utils/serverErrorClass";
import { generateUpdateQuery } from "../helpers/helpers";
import { ShopProductInterface } from "../interfaces/shopProductInterface";
import { UpdateProductInterface } from "../interfaces/updateProductInterface";

export const getProductByIdFromDb = async (id: string) => {
    try {

        await client.query('BEGIN');
        const product = await client.query(
            `SELECT
            id, name, "salePrice", quantity, description, category, "discountPercentage", "imageUrl", "imageAlt"
            FROM products WHERE id = $1`,
            [id]
        );
        await client.query('COMMIT');
        
        if (product.rows.length === 0) throw new ServerError(400, "product not found");
        return product.rows[0] as ShopProductInterface;
    } catch (error) {
        await client.query('ROLLBACK');
        return Promise.reject(error);
    }
};

export const getProductsBySearchFromDb = async (searchText: string) => {
    try {

        await client.query('BEGIN');        
        const products = await client.query(
            `SELECT
            id, name, "salePrice", quantity, description, category, "discountPercentage", "imageUrl", "imageAlt"
            FROM products
            WHERE name ILIKE '%${searchText}%'
                OR description ILIKE '%${searchText}%'
                OR category ILIKE '%${searchText}%';`
        );
        await client.query('COMMIT');
        
        return products.rows as ShopProductInterface[];
    } catch (error) {
        await client.query('ROLLBACK');
        return Promise.reject(error);
    }
};

export const getProductsByIdFromDb = async (ids:string[]) => {
    try {
        const query = `SELECT
        id, name, "salePrice", quantity, description, category, "discountPercentage", "imageUrl", "imageAlt"
        FROM products
        WHERE id IN (${ids});`;

        await client.query('BEGIN');        
        const products = await client.query(query);
        await client.query('COMMIT');
                
        if (products.rows.length != ids.length){
            const onlyInIds = ids.filter(id => !products.rows.some(obj => obj.id === Number(id)));
            throw {
                productId:onlyInIds[0],
                cause: "no product id"
            }
        }
        
        return products.rows as ShopProductInterface[];

    } catch (error) {
        await client.query('ROLLBACK');
        return Promise.reject(error);
    }
};

export const updateProductsInDb = async (productsToUpdate:UpdateProductInterface[], action:'-'|'+') => {
    const query = generateUpdateQuery(productsToUpdate, action);
    try {
        await client.query('BEGIN');
        await client.query(query);
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        return Promise.reject(error);
    }
}