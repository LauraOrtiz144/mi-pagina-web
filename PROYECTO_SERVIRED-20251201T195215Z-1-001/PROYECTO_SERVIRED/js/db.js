// db.js
const DB_NAME = 'IWorkDB';
const DB_VERSION = 2; // Incrementamos la versión para agregar postulaciones

export function abrirDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Store de usuarios
      if (!db.objectStoreNames.contains('usuarios')) {
        db.createObjectStore('usuarios', { keyPath: 'email' });
      }

      // Store de vacantes
      if (!db.objectStoreNames.contains('vacantes')) {
        db.createObjectStore('vacantes', { keyPath: 'id', autoIncrement: true });
      }

      // Store de postulaciones
      if (!db.objectStoreNames.contains('postulaciones')) {
        const postulacionesStore = db.createObjectStore('postulaciones', { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        
        // Índices para búsquedas eficientes
        postulacionesStore.createIndex('vacanteId', 'vacanteId', { unique: false });
        postulacionesStore.createIndex('emailPostulante', 'emailPostulante', { unique: false });
        postulacionesStore.createIndex('estado', 'estado', { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = (e) => {
      reject(request.error);
    };
  });
}