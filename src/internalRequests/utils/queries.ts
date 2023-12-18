const queries = {
  getAllProductsQ: "SELECT * FROM products",
  getProductByIdQ: "SELECT * FROM products WHERE id=",
  deleteProductByIdQ: "DELETE FROM products WHERE id=",
  updateQuantityQ: "UPDATE products SET quantity=",
};
export default queries;
