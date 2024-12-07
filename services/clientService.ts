import { getDatabase } from "@/lib/sqlite/database";
import { Client } from "@/models";
import { Logger } from "@/utils/logger";

// Crear un nuevo cliente
export const createClient = async (
  client: Omit<Client, "id" | "createdAt" | "updatedAt" | "deletedAt">
): Promise<number | null> => {
  try {
    Logger.log("👤 Creating client.");
    const db = await getDatabase();
    const result = await db.runAsync(
      `
        INSERT INTO client (name, phoneNumber, imageUri, createdBy, createdAt, updatedBy, updatedAt) 
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP)`,
      [
        client.name,
        client.phoneNumber || null,
        client.imageUri || null,
        client.createdBy || null,
        null,
      ]
    );
    Logger.log("👤 Client created successfully.");
    return result.changes;
  } catch (error) {
    Logger.log(`❌ Error creating client. Error: ${error}`);
    return null;
  }
};

// Obtener todos los clientes
export const getClients = async (): Promise<Client[]> => {
  try {
    Logger.log("👤 Retrieving all clients.");
    const db = await getDatabase();
    const result = await db.getAllAsync("SELECT * FROM client;");
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
    Logger.log("👤 Clients retrieved successfully.");
    return clients;
  } catch (error) {
    Logger.log(`❌ Error retrieving clients. Error: ${error}`);
    return [];
  }
};

// Actualizar un cliente
export const updateClient = async (
  id: number,
  client: Omit<Client, "id" | "createdAt" | "updatedAt" | "deletedAt">
): Promise<boolean> => {
  try {
    Logger.log(`👤 Updating client with id: ${id}.`);
    const db = await getDatabase();
    const result = await db.runAsync(
      `
        UPDATE client 
        SET name = ?, phoneNumber = ?, imageUri = ?, updatedBy = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
      [
        client.name,
        client.phoneNumber || "",
        client.imageUri || "",
        client.updatedBy || "INIT",
        id,
      ]
    );
    Logger.log("👤 Client updated successfully.");
    return result.changes > 0;
  } catch (error) {
    Logger.log(`❌ Error updating client with id: ${id}. Error: ${error}`);
    return false;
  }
};

// Eliminar un cliente (borrado lógico)
export const deleteClient = async (id: number): Promise<boolean> => {
  try {
    Logger.log(`👤 Deleting client with id: ${id}.`);
    const db = await getDatabase();
    const result = await db.runAsync(
      `
        UPDATE client 
        SET deletedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
      [id]
    );
    Logger.log("👤 Client deleted successfully.");
    return result.changes > 0;
  } catch (error) {
    Logger.log(`❌ Error deleting client with id: ${id}. Error: ${error}`);
    return false;
  }
};

// Función para obtener un cliente por ID
export const getClientById = async (id: number): Promise<Client | null> => {
  try {
    Logger.log(`👤 Retrieving client with id: ${id}.`);
    const db = await getDatabase();
    const result = await db.getFirstAsync<Client>(
      "SELECT * FROM client WHERE id = ?;",
      [id]
    );
    Logger.log("👤 Client retrieved successfully.");
    return result;
  } catch (error) {
    Logger.log(`❌ Error retrieving client with id: ${id}. Error: ${error}`);
    return null;
  }
};
