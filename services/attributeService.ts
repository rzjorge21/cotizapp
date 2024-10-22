import { getDatabase } from "@/lib/sqlite/database";
import { Attribute } from "@/models";

// Crear un nuevo atributo
export const createAttribute = async (attribute: Omit<Attribute, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<number | null> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.runAsync(`
        INSERT INTO attribute (productId, name, price, createdBy, createdAt, updatedBy, updatedAt) 
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP)`,
        [attribute.productId, attribute.name, attribute.price, attribute.createdBy || null, null]);
      return result.changes; // Retorna el ID del atributo insertado
    } else {
      console.error("Database not initialized.");
      return null;
    }
  } catch (error) {
    console.error("Error creando atributo:", error);
    return null;
  }
};

// Obtener todos los atributos
export const getAttributes = async (): Promise<Attribute[]> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.getAllAsync("SELECT * FROM attribute;");
      const attributes: Attribute[] = result.map((row: any) => ({
        id: row.id,
        productId: row.productId,
        name: row.name,
        price: row.price,
        createdBy: row.createdBy,
        createdAt: row.createdAt,
        updatedBy: row.updatedBy,
        updatedAt: row.updatedAt,
        deletedAt: row.deletedAt,
      }));
      console.log(attributes);
      return attributes;
    } else {
      console.error("Database not initialized.");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los atributos:", error);
    return [];
  }
};

// Actualizar un atributo
export const updateAttribute = async (id: number, attribute: Omit<Attribute, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<boolean> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.runAsync(`
        UPDATE attribute 
        SET productId = ?, name = ?, price = ?, updatedBy = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [attribute.productId, attribute.name, attribute.price, attribute.updatedBy || 'INIT', id]);
      return result.changes > 0; // Retorna true si se actualizó alguna fila
    } else {
      console.error("Database not initialized.");
      return false;
    }
  } catch (error) {
    console.error("Error al actualizar el atributo:", error);
    return false;
  }
};

// Eliminar un atributo (borrado lógico)
export const deleteAttribute = async (id: number): Promise<boolean> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.runAsync(`
        UPDATE attribute 
        SET deletedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [id]);
      return result.changes > 0; // Retorna true si se actualizó alguna fila
    } else {
      console.error("Database not initialized.");
      return false;
    }
  } catch (error) {
    console.error("Error al eliminar el atributo:", error);
    return false;
  }
};

// Función para obtener un atributo por ID
export const getAttributeById = async (id: number): Promise<Attribute | null> => {
  try {
    const db = await getDatabase(); // Obtener la conexión a la base de datos

    if (db) {
      // Ejecutar la consulta para obtener el atributo por ID
      const result = await db.getFirstAsync<Attribute>(
        "SELECT * FROM attribute WHERE id = ?;",
        [id] // Pasar el ID como parámetro para la consulta
      );

      // Verificar si el atributo existe
      if (result) {
        return result;
      } else {
        console.log(`Atributo con ID ${id} no encontrado.`);
        return null;
      }
    } else {
      console.error("La base de datos no está inicializada.");
      return null;
    }
  } catch (error) {
    console.error("Error inesperado al obtener el atributo:", error);
    return null;
  }
};

export const getAttributesByProductId = async (productId: number): Promise<Attribute[]> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.getAllAsync("SELECT * FROM attribute WHERE productId = ?;", [productId]);
      return result.map((row: any) => ({
        id: row.id,
        productId: row.productId,
        name: row.name,
        price: row.price,
        createdBy: row.createdBy,
        createdAt: row.createdAt,
        updatedBy: row.updatedBy,
        updatedAt: row.updatedAt,
        deletedAt: row.deletedAt,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error al obtener atributos del producto:", error);
    return [];
  }
};
