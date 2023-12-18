import ServerError from "../../utils/serverErrorClass";
import { ShopProductInterface } from "../interfaces/shopProductInterface";
import { UpdateProductInterface } from "../interfaces/updateProductInterface";

export const exportIdsToArray = (products:UpdateProductInterface[]) => {
    const ids = products.map(product => {
        if(Number.isNaN(+product.productId)) {
            throw new ServerError(404, 'Id must be a number');
          }
        return product.productId.toString();
    });
    return ids;
  }
  
export const checkQuantity = (productsToUpdate:UpdateProductInterface[],
                              productsToUpdateFromDb:ShopProductInterface[]) => 
                              {
    const notInStock = [];
    const inStock = [];
    for(let i = 0; i < productsToUpdate.length; i++){
        const productToUpdate = productsToUpdate[i];
        const productFromDb = productsToUpdateFromDb.find(item => 
            String(item.id) === productToUpdate.productId.toString());
        
        if(productFromDb!.quantity - productToUpdate.requiredQuantity < 0){
            notInStock.push({
                product:productFromDb,
                requiredQuantity:productToUpdate.requiredQuantity
            });
        }else{
            inStock.push({
                productId:Number(productToUpdate.productId),
                requiredQuantity:productToUpdate.requiredQuantity
            });
        }
    }

    return {inStock, notInStock};
}

export const generateUpdateQuery = (productsToUpdate:UpdateProductInterface[], action:'+'|'-') => {
    let query = `UPDATE products 
    SET quantity = CASE `;
    
    for (let i = 0; i < productsToUpdate.length; i++) {
        const product = productsToUpdate[i];
        const addToQuery = `WHEN id = ${product.productId} THEN GREATEST(quantity${action}${product.requiredQuantity},0) `;
        query += addToQuery;
    }

    query += `END
    WHERE id IN (`

    for (let i = 0; i < productsToUpdate.length; i++) {
        const product = productsToUpdate[i];
        const addToQuery = `${product.productId},`;
        query += addToQuery;
    }
    // remove last comma
    query = query.slice(0, -1); 

    query += `);`;
    return query;
}