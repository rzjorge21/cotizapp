import { Logger } from "@/utils/logger";
import { getDatabase } from "../lib/sqlite/database";
import { GetOrderDTO, Order, Product } from "../models";
import { QUOT_STATES } from "@/config";
import { getProductById } from "./productService";

export const createOrder = async (
  clientId: number,
  items: { productId: number; quantity: number }[]
): Promise<number | null> => {
  try {
    Logger.log(`📃 Creating order.`);
    const db = await getDatabase();
    let totalPrice = 0;
    const createdOrder = await db.runAsync(
      `
        INSERT INTO "order" (clientId, totalPrice, status, createdBy, createdAt, updatedBy, updatedAt) 
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP)`,
      [clientId, totalPrice, QUOT_STATES.QUOTATION, "INIT", "INIT"]
    );
    const orderId = createdOrder.lastInsertRowId;

    for (const item of items) {
      const product: Product | null = await getProductById(item.productId);
      if (product) {
        totalPrice = totalPrice + product.price * item.quantity;
        await db.runAsync(
          `
            INSERT INTO order_product (orderId, productId, quantity, createdBy, createdAt, updatedBy, updatedAt) 
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP)`,
          [orderId, item.productId, item.quantity, "INIT", "INIT"]
        );
      } else {
        throw Error;
      }
    }

    const result = await db.runAsync(
      `
        UPDATE "order"
        SET totalPrice = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
      [totalPrice, orderId]
    );
    Logger.log(`📃 Order created succesfully.`);
    return createdOrder.changes;
  } catch (error) {
    Logger.log(`❌ Error creating order. Error: ${error}`);
    return null;
  }
};

export const getOrders = async (
  state?: QUOT_STATES
): Promise<GetOrderDTO[]> => {
  try {
    const db = await getDatabase();
    state
      ? Logger.log(`📃 Getting orders filtered by status: ${state}.`)
      : Logger.log(`📃 Getting all orders.`);

    const query = state
      ? `SELECT o.*, c.name AS clientName, c.imageUri AS clientImageUri 
         FROM "order" o 
         LEFT JOIN "client" c ON o.clientId = c.id 
         WHERE o.status = ? 
         AND o.deletedAt IS NULL
         ORDER BY o.createdAt DESC;`
      : `SELECT o.*, c.name AS clientName, c.imageUri AS clientImageUri 
         FROM "order" o 
         LEFT JOIN "client" c ON o.clientId = c.id 
         WHERE o.deletedAt IS NULL
         ORDER BY o.createdAt DESC;`;
    const params = state ? [state] : [];

    const result = await db.getAllAsync(query, params);

    const orders: GetOrderDTO[] = await Promise.all(
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
        clientName: row.clientName,
        clientImageUri: row.clientImageUri || null, // Manejo de valores opcionales
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
  orderId: number,
  clientId: number,
  items: { productId: number; quantity: number }[]
): Promise<boolean> => {
  try {
    Logger.log(`📃 Updating order with id: ${orderId}.`);
    const db = await getDatabase();
    let totalPrice = 0;

    const createdOrder = await db.getFirstAsync<Order>(
      `SELECT * FROM "order" WHERE id = ?;`,
      [orderId]
    );

    if (createdOrder?.status == QUOT_STATES.ORDER) {
      Logger.log(`📃 Cannot update a completed order.`);
      return false;
    }

    // Deleting past order products
    await db.runAsync(`DELETE FROM order_product WHERE orderId = ?`, [orderId]);

    for (const item of items) {
      const product: Product | null = await getProductById(item.productId);
      if (product) {
        totalPrice = totalPrice + product.price * item.quantity;
        await db.runAsync(
          `
            INSERT INTO order_product (orderId, productId, quantity, createdBy, createdAt, updatedBy, updatedAt) 
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP)`,
          [orderId, item.productId, item.quantity, "INIT", "INIT"]
        );
      } else {
        throw Error;
      }
    }

    const result = await db.runAsync(
      `
        UPDATE "order"
        SET totalPrice = ?, updatedAt = CURRENT_TIMESTAMP, clientId = ?
        WHERE id = ?`,
      [totalPrice, clientId, orderId]
    );

    Logger.log(`📃 Order updated succesfully.`);
    return result.changes > 0;
  } catch (error) {
    Logger.log(`❌ Error updating order with id: ${orderId}. Error: ${error}`);
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

export const getOrderById = async (
  id: number
): Promise<
  | (Order & {
      items: {
        productId: number;
        productName: string;
        quantity: number;
        price: number;
      }[];
    })
  | null
> => {
  try {
    Logger.log(`📃 Getting order with id: ${id}.`);
    const db = await getDatabase();

    // Obtener la orden
    const order = await db.getFirstAsync<Order>(
      `SELECT * FROM "order" WHERE id = ?;`,
      [id]
    );

    if (!order) {
      Logger.log(`📃 No order found with id: ${id}.`);
      return null;
    }

    // Obtener los productos asociados a la orden con JOIN para incluir productName y price
    const items = await db.getAllAsync<{
      productId: number;
      productName: string;
      price: number;
      quantity: number;
    }>(
      `
      SELECT p.id AS productId, p.name AS productName, p.price, op.quantity
      FROM order_product op
      JOIN product p ON op.productId = p.id
      WHERE op.orderId = ?;
      `,
      [id]
    );

    Logger.log(`📃 Order with id: ${id} and items returned successfully.`);
    return {
      ...order,
      items,
    };
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
        UPDATE "order" 
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
