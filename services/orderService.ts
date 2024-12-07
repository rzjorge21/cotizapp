import { Logger } from "@/utils/logger";
import { getDatabase } from "../lib/sqlite/database";
import { Order } from "../models";
import { QUOT_STATES } from "@/config";

export const createOrder = async (
  order: Omit<Order, "id" | "createdAt" | "updatedAt" | "deletedAt">
): Promise<number | null> => {
  try {
    Logger.log(`📃 Creating order.`);
    const db = await getDatabase();
    const result = await db.runAsync(
      `
        INSERT INTO order (clientId, totalPrice, status, createdBy, createdAt, updatedBy, updatedAt) 
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP)`,
      [
        order.clientId,
        order.totalPrice,
        order.status,
        order.createdBy || "INIT",
        order.updatedBy || "INIT",
      ]
    );
    Logger.log(`📃 Order created succesfully.`);
    return result.changes;
  } catch (error) {
    Logger.log(`❌ Error creating order. Error: ${error}`);
    return null;
  }
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const db = await getDatabase();
    Logger.log(`📃 Creating order.`);
    const result = await db.getAllAsync("SELECT * FROM order;");

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
    Logger.log(`📃 Orders returned succesfully.`);
    return orders;
  } catch (error) {
    Logger.log(`❌ Error getting all orders. Error: ${error}`);
    return [];
  }
};

export const updateOrder = async (
  id: number,
  order: Omit<Order, "id" | "createdAt" | "updatedAt" | "deletedAt">
): Promise<boolean> => {
  try {
    Logger.log(`📃 Updating order with id: ${id}.`);
    const db = await getDatabase();

    const temp = await db.getFirstAsync<Order>(
      "SELECT * FROM order WHERE id = ?;",
      [id]
    );
    if (temp?.status == QUOT_STATES.ORDER) {
      Logger.log(`📃 Cannot update a completed order.`);
      return false;
    }

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
    Logger.log(`📃 Order updated succesfully.`);
    return result.changes > 0;
  } catch (error) {
    Logger.log(`❌ Error updating order with id: ${id}. Error: ${error}`);
    return false;
  }
};

export const deleteOrder = async (id: number): Promise<boolean> => {
  try {
    Logger.log(`📃 Deleting order with id: ${id}.`);
    const db = await getDatabase();
    const result = await db.runAsync(
      `
        UPDATE "order" 
        SET deletedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
      [id]
    );
    Logger.log(`📃 Order deleted succesfully.`);
    return result.changes > 0;
  } catch (error) {
    Logger.log(`❌ Error deleting order with id: ${id}. Error: ${error}`);
    return false;
  }
};

export const getOrdersById = async (id: number): Promise<Order | null> => {
  try {
    Logger.log(`📃 Getting order with id: ${id}.`);
    const db = await getDatabase();
    const result = await db.getFirstAsync<Order>(
      "SELECT * FROM order WHERE id = ?;",
      [id]
    );
    Logger.log(`📃 Order with id: ${id} returned succesfully.`);
    return result;
  } catch (error) {
    Logger.log(`❌ Error getting order with id: ${id}. Error: ${error}`);
    return null;
  }
};

export const updateStatusToCompleted = async (id: number): Promise<boolean> => {
  try {
    Logger.log(`📃 Updating the order status with id: ${id} to completed.`);
    const db = await getDatabase();
    const result = await db.runAsync(
      `
        UPDATE order 
        SET status = ?
        WHERE id = ?`,
      [QUOT_STATES.ORDER, id]
    );
    return result.changes > 0;
  } catch (error) {
    Logger.log(`❌ Error getting order with id: ${id}. Error: ${error}`);
    return false;
  }
};
