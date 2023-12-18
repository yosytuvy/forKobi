import { ShopProductInterface } from "../../shop_inventory/interfaces/shopProductInterface";

export interface AdminProductInterface extends ShopProductInterface {
  isForSale: boolean;
  costPrice: number;
  supplier: string;
  createdBy?: string;
}
