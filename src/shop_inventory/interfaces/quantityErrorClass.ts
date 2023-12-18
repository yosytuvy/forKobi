class QuantityError extends Error {
    errors: Array<{productId: string, 
                   requestQuantity: number,
                   inInventory: number}>
  
    constructor(errors: Array<{productId: string, 
                                requestQuantity: number,
                                inInventory: number}>) 
    {
      super("Invalid input");
      this.errors = errors; 
    }
}