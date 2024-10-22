import { getDatabase } from "@/lib/sqlite/database";
import { Product } from "@/models";
import { getAttributesByProductId } from "./attributeService";

// Crear un nuevo producto
export const createProduct = async (
  product: Omit<Product, "id" | "createdAt" | "updatedAt" | "deletedAt">
): Promise<number | null> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.runAsync(
        `
        INSERT INTO product (name, price, createdBy, createdAt, updatedBy, updatedAt) 
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP)`,
        [product.name, product.price, product.createdBy || null, null]
      );
      return result.changes; // Retorna el ID del producto insertado
    } else {
      console.error("Database not initialized.");
      return null;
    }
  } catch (error) {
    console.error("Error creando producto:", error);
    return null;
  }
};

// Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.getAllAsync("SELECT * FROM product;");

      const products: Product[] = await Promise.all(
        result.map(async (row: any) => {
          const attributes = await getAttributesByProductId(row.id); // Obtener atributos por productId
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
            attributes,
          };
        })
      );

      console.log(products);
      return products;
    } else {
      console.error("Database not initialized.");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
};

// Actualizar un producto
export const updateProduct = async (
  id: number,
  product: Omit<Product, "id" | "createdAt" | "updatedAt" | "deletedAt">
): Promise<boolean> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.runAsync(
        `
        UPDATE product 
        SET name = ?, price = ?, updatedBy = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [product.name, product.price, product.updatedBy || "INIT", id]
      );
      return result.changes > 0; // Retorna true si se actualizó alguna fila
    } else {
      console.error("Database not initialized.");
      return false;
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return false;
  }
};

// Eliminar un producto (borrado lógico)
export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.runAsync(
        `
        UPDATE product 
        SET deletedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [id]
      );
      return result.changes > 0; // Retorna true si se actualizó alguna fila
    } else {
      console.error("Database not initialized.");
      return false;
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return false;
  }
};

// Función para obtener un producto por ID
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const db = await getDatabase(); // Obtener la conexión a la base de datos

    if (db) {
      // Ejecutar la consulta para obtener el producto por ID
      const result = await db.getFirstAsync<Product>(
        "SELECT * FROM product WHERE id = ?;",
        [id] // Pasar el ID como parámetro para la consulta
      );

      // Verificar si el producto existe
      if (result) {
        const attributes = await getAttributesByProductId(result.id); // Obtener atributos por productId
        return {
          ...result,
          attributes, // Añadir atributos
        };
      } else {
        console.log(`Producto con ID ${id} no encontrado.`);
        return null;
      }

    } else {
      console.error("La base de datos no está inicializada.");
      return null;
    }
  } catch (error) {
    console.error("Error inesperado al obtener el producto:", error);
    return null;
  }
};
