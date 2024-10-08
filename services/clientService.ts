import db from "@/lib/sqlite/database";


// Función para formatear la fecha en el formato 'YYYY-MM-DD HH:MM:SS'
const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

// Función para agregar un cliente
export const addClient = (client: any) => {
  try {
    const createdAt = formatDate(new Date());  // Formatear la fecha correctamente

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO client (name, phoneNumber, createdBy, createdAt) VALUES (?, ?, ?, ?)',
        [client.name, client.phoneNumber, "admin", createdAt],
        (tx, result) => {
          // Callback de éxito
          console.log("Cliente agregado con éxito, ID:", result.insertId);
        },
        (tx, error) => {
          // Manejo del error
          console.error("Error al agregar el cliente:", error);
          return true; // Indicar que hubo un error
        }
      );
    });
  } catch (error) {
    console.error("Error inesperado al agregar cliente:", error);
  }
};

// Función para obtener clientes
export const getClients = async (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM client',
          [],
          (tx, results) => {
            const clients = [];
            for (let i = 0; i < results.rows.length; i++) {
              clients.push(results.rows.item(i));
            }
            // Resolución exitosa
            resolve(clients);
          },
          (tx, error) => {
            // Manejo del error
            console.error("Error al obtener los clientes:", error);
            reject(error); // Rechaza la promesa con el error
            return true; // Esto indica que hubo un error
          }
        );
      });
    } catch (error) {
      console.error("Error inesperado al obtener clientes:", error);
      reject(error);
    }
  });
};
