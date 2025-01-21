import { openDB } from 'idb';

const DB_NAME = 'TaskanaDB';
const DB_VERSION = 1;
const STORE_NAME = 'taskanaStore';

// Inicializa la base de datos
export const initDB = async () => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

// Guarda datos en IndexedDB
export const saveToIndexedDB = async (key, value) => {
  const db = await initDB();
  await db.put(STORE_NAME, value, key);
};

// Carga datos desde IndexedDB
export const loadFromIndexedDB = async (key) => {
  const db = await initDB();
  return await db.get(STORE_NAME, key);
};
