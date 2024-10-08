export const create_table_statement = `-- -----------------------------------------------------
-- Tabla user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  createdBy TEXT NOT NULL DEFAULT 'INIT',
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy TEXT,
  updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deletedAt TEXT,
  UNIQUE (email)
);

-- -----------------------------------------------------
-- Tabla master_table
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS master_table (
  id INTEGER PRIMARY KEY,
  parentId INTEGER,
  value TEXT NOT NULL,
  createdBy TEXT NOT NULL DEFAULT 'INIT',
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy TEXT,
  updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deletedAt TEXT
);

-- Insertamos valores en master_table
INSERT INTO master_table (id, parentId, value, createdBy, createdAt) VALUES 
(200, null, 'STATE', 'INIT', datetime('now')),
(201, 200, 'Cotizacion', 'INIT', datetime('now')),
(202, 200, 'Finalizado', 'INIT', datetime('now'));

-- -----------------------------------------------------
-- Tabla product
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price DECIMAL(10, 2),
  createdBy TEXT NOT NULL DEFAULT 'INIT',
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy TEXT,
  updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deletedAt TEXT
);

-- -----------------------------------------------------
-- Tabla attribute
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS attribute (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  productId INTEGER NOT NULL,
  name TEXT,
  price DECIMAL(10, 2),
  createdBy TEXT NOT NULL DEFAULT 'INIT',
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy TEXT,
  updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deletedAt TEXT,
  FOREIGN KEY (productId) REFERENCES product(id)
);

-- -----------------------------------------------------
-- Tabla client
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS client (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  phoneNumber TEXT,
  createdBy TEXT NOT NULL DEFAULT 'INIT',
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy TEXT,
  updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deletedAt TEXT
);

-- -----------------------------------------------------
-- Tabla order
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "order" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clientId INTEGER NOT NULL,
  totalPrice DECIMAL(10, 2),
  status INTEGER,
  createdBy TEXT NOT NULL DEFAULT 'INIT',
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy TEXT,
  updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deletedAt TEXT,
  FOREIGN KEY (clientId) REFERENCES client(id)
);

-- -----------------------------------------------------
-- Tabla order_product
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS order_product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  orderId INTEGER NOT NULL,
  productId INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  attributes TEXT,
  createdBy TEXT NOT NULL DEFAULT 'INIT',
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy TEXT,
  updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deletedAt TEXT,
  FOREIGN KEY (orderId) REFERENCES "order"(id),
  FOREIGN KEY (productId) REFERENCES product(id)
);
`