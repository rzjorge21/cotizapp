// user.model.ts
export interface User {
  id: number;
  email: string;
  password: string;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
  deletedAt?: string;
}

// masterTable.model.ts
export interface MasterTable {
  id: number;
  parentId?: number | null;
  value: string;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
  deletedAt?: string;
}

// product.model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
  deletedAt?: string;
}

// attribute.model.ts
export interface Attribute {
  id: number;
  productId: number;
  name: string;
  price: number;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
  deletedAt?: string;
}

// client.model.ts
export interface Client {
  id: number;
  name: string;
  phoneNumber?: string;
  createdBy?: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
  deletedAt?: string;
}

// order.model.ts
export interface Order {
  id: number;
  clientId: number;
  totalPrice: number;
  status: number;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
  deletedAt?: string;
}

// orderProduct.model.ts
export interface OrderProduct {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  attributes?: string;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
  deletedAt?: string;
}
