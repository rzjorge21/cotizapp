import { getDatabase } from "../lib/sqlite/database";
import { Order } from "../models";

export const createOrder = async (
  order: Omit<Order, "id" | "createdAt" | "updatedAt" | "deletedAt">
): Promise<number | null> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.runAsync(
        `
        INSERT INTO "order" (clientId, totalPrice, status, createdBy, createdAt, updatedBy, updatedAt) 
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP)`,
        [
          order.clientId,
          order.totalPrice,
          order.status,
          order.createdBy || "INIT",
          order.updatedBy || "INIT",
        ]
      );
      return result.changes; // Retorna el ID del pedido insertado
    } else {
      console.error("Database not initialized.");
      return null;
    }
  } catch (error) {
    console.error("Error creando pedido:", error);
    return null;
  }
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.getAllAsync("SELECT * FROM \"order\";");

      const orders: Order[] = await Promise.all(
        result.map(async (row: any) => ({
          id: row.id,
          clientId: row.clientId,
          totalPrice: row.totalPrice,
          status: row.status,
          createdBy: row.createdBy,
          createdAt: row.createdAt,
          updatedBy: row.updatedBy,
          updatedAt: row.updatedAt,
          deletedAt: row.deletedAt,
        }))
      );

      return orders;
    } else {
      console.error("Database not initialized.");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    return [];
  }
};

export const updateOrder = async (
  id: number,
  order: Omit<Order, "id" | "createdAt" | "updatedAt" | "deletedAt">
): Promise<boolean> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.runAsync(
        `
        UPDATE "order" 
        SET clientId = ?, totalPrice = ?, status = ?, updatedBy = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [
          order.clientId,
          order.totalPrice,
          order.status,
          order.updatedBy || "INIT",
          id,
        ]
      );
      return result.changes > 0; // Retorna true si se actualizó alguna fila
    } else {
      console.error("Database not initialized.");
      return false;
    }
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    return false;
  }
};

export const deleteOrder = async (id: number): Promise<boolean> => {
  try {
    const db = await getDatabase();
    if (db) {
      const result = await db.runAsync(
        `
        UPDATE "order" 
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
    console.error("Error al eliminar el pedido:", error);
    return false;
  }
};
