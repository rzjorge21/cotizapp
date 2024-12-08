import { getDatabase } from "@/lib/sqlite/database";
import { Product } from "@/models";
import { Logger } from "@/utils/logger";

// Crear un nuevo producto
export const createProduct = async (
  product: Omit<Product, "id" | "createdAt" | "updatedAt" | "deletedAt">
): Promise<number | null> => {
  try {
    Logger.log("📦 Creating product.");
    const db = await getDatabase();
    const result = await db.runAsync(
      `
        INSERT INTO product (name, price, createdBy, createdAt, updatedBy, updatedAt) 
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP)`,
      [product.name, product.price, product.createdBy || "INIT", "INIT"]
    );
    Logger.log("📦 Product created successfully.");
    return result.changes;
  } catch (error) {
    Logger.log(`❌ Error creating product. Error: ${error}`);
    return null;
  }
};

// Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
  try {
    Logger.log("📦 Retrieving all products.");
    const db = await getDatabase();
    const result = await db.getAllAsync(`SELECT * FROM product;`);

    const products: Product[] = await Promise.all(
      result.map(async (row: any) => {
        return {
          id: row.id,
          name: row.name,
          description: row.description,
          price: row.price,
          createdBy: row.createdBy,
          createdAt: row.createdAt,
          updatedBy: row.updatedBy,
          updatedAt: row.updatedAt,
          deletedAt: row.deletedAt,
        };
      })
    );

    Logger.log("📦 Products retrieved successfully.");
    return products;
  } catch (error) {
    Logger.log(`❌ Error retrieving products. ${error}`);
    return [];
  }
};

// Actualizar un producto
export const updateProduct = async (
  id: number,
  product: Omit<Product, "id" | "createdAt" | "updatedAt" | "deletedAt">
): Promise<boolean> => {
  try {
    Logger.log(`📦 Updating product with id: ${id}.`);
    const db = await getDatabase();
    const result = await db.runAsync(
      `
        UPDATE product 
        SET name = ?, price = ?, updatedBy = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
      [product.name, product.price, product.updatedBy || "INIT", id]
    );
    Logger.log("📦 Product updated successfully.");
    return result.changes > 0;
  } catch (error) {
    Logger.log(`❌ Error updating product with id: ${id}. Error: ${error}`);
    return false;
  }
};

// Eliminar un producto (borrado lógico)
export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    Logger.log(`📦 Deleting product with id: ${id}.`);
    const db = await getDatabase();
    const result = await db.runAsync(
      `
        UPDATE product 
        SET deletedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
      [id]
    );
    Logger.log("📦 Product deleted successfully.");
    return result.changes > 0;
  } catch (error) {
    Logger.log(`❌ Error deleting product with id: ${id}. Error: ${error}`);
    return false;
  }
};

// Obtener un producto por ID
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    Logger.log(`📦 Retrieving product with id: ${id}.`);
    const db = await getDatabase();
    const result = await db.getFirstAsync<Product>(
      "SELECT * FROM product WHERE id = ?;",
      [id]
    );
    Logger.log("📦 Product retrieved successfully.");
    return result;
  } catch (error) {
    Logger.log(`❌ Error retrieving product with id: ${id}. Error: ${error}`);
    return null;
  }
};
