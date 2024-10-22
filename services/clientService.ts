import { getDatabase } from "@/lib/sqlite/database";
import { Client } from "@/models";

// Crear un nuevo cliente
export const createClient = async (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<number | null> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.runAsync(`
        INSERT INTO client (name, phoneNumber, imageUri, createdBy, createdAt, updatedBy, updatedAt) 
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP)`,
        [client.name, client.phoneNumber || null, client.imageUri || null, client.createdBy || null, null]);
      return result.changes; // Retorna el ID del cliente insertado
    } else {
      console.error("Database not initialized.");
      return null;
    }
  } catch (error) {
    console.error("Error creando cliente:", error);
    return null;
  }
};

// Obtener todos los clientes
export const getClients = async (): Promise<Client[]> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.getAllAsync("SELECT * FROM client ;");
      const clients: Client[] = result.map((row: any) => ({
        id: row.id,
        name: row.name,
        phoneNumber: row.phoneNumber,
        imageUri: row.imageUri,
        createdBy: row.createdBy,
        createdAt: row.createdAt,
        updatedBy: row.updatedBy,
        updatedAt: row.updatedAt,
        deletedAt: row.deletedAt,
      }));
      console.log(clients)
      return clients;
    } else {
      console.error("Database not initialized.");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    return [];
  }
};

// Actualizar un cliente
export const updateClient = async (id: number, client: Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<boolean> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.runAsync(`
        UPDATE client 
        SET name = ?, phoneNumber = ?, imageUri = ?, updatedBy = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [client.name, client.phoneNumber || "", client.imageUri || "", client.updatedBy || 'INIT', id]);
      return result.changes > 0; // Retorna true si se actualizó alguna fila
    } else {
      console.error("Database not initialized.");
      return false;
    }
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    return false;
  }
};

// Eliminar un cliente (borrado lógico)
export const deleteClient = async (id: number): Promise<boolean> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.runAsync(`
        UPDATE client 
        SET deletedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [id]);
      return result.changes > 0; // Retorna true si se actualizó alguna fila
    } else {
      console.error("Database not initialized.");
      return false;
    }
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    return false;
  }
};

// Función para obtener un cliente por ID
export const getClientById = async (id: number): Promise<Client | null> => {
  try {
    const db = await getDatabase(); // Obtener la conexión a la base de datos

    if (db) {
      // Ejecutar la consulta para obtener el cliente por ID
      const result = await db.getFirstAsync<Client>(
        "SELECT * FROM client WHERE id = ?;",
        [id] // Pasar el ID como parámetro para la consulta
      );

      // Verificar si el cliente existe
      if (result) {
        return result;
      } else {
        console.log(`Cliente con ID ${id} no encontrado.`);
        return null;
      }
    } else {
      console.error("La base de datos no está inicializada.");
      return null;
    }
  } catch (error) {
    console.error("Error inesperado al obtener el cliente:", error);
    return null;
  }
};