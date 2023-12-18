import {
  getProductByIdFromDb,
  getProductsBySearchFromDb,
  getProductsByIdFromDb
} from "../dal/productsDal";

const ID = "123";
const productKeys = [
  "id",
  "name",
  "salePrice",
  "quantity",
  "description",
  "category",
  "discountPercentage",
  "imageUrl",
  "imageAlt",
];

describe("getProductByIdFromDb function", () => {
  it("return valid product", async () => {
    
    const result = await getProductByIdFromDb(ID);
    expect(Object.keys(result)).toEqual(productKeys);
  });
});

describe("getProductsBySearchFromDb function", () => {
  it("return search item", async () => {
    const searchText = "shirt";
    const result = await getProductsBySearchFromDb(searchText);
    const toCheck = result[0].name + result[0].category + result[0].description;
    expect(toCheck).toContain(searchText);
  });
});

describe("getProductsByIdFromDb function", () => {
  it("return valid product", async () => {
    const result = await getProductsByIdFromDb([ID]);
    expect(Object.keys(result[0])).toEqual(productKeys);
  });
});