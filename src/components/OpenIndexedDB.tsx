export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('NotesDB', 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result as IDBDatabase;
      db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = (event: any) => {
      const db = event.target.result as IDBDatabase;
      resolve(db);
    };

    request.onerror = (event: any) => {
      reject(event.target.error);
    };
  });
};