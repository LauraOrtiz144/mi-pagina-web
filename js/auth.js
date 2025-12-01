import { abrirDB } from './db.js';

export async function registrarUsuario(userData) {
  try {
    console.log('Intentando registrar usuario:', userData);
    const db = await abrirDB();

    // Verificar si ya existe usuario con ese email
    const usuarioExistente = await new Promise((resolve, reject) => {
      const tx = db.transaction('usuarios', 'readonly');
      const store = tx.objectStore('usuarios');
      const request = store.get(userData.email);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (usuarioExistente) {
      console.log('Usuario ya existe con ese email');
      return false;
    }

    // Agregar nuevo usuario
    await new Promise((resolve, reject) => {
      const tx = db.transaction('usuarios', 'readwrite');
      const store = tx.objectStore('usuarios');
      const request = store.add(userData);
      
      request.onsuccess = () => {
        console.log('Usuario registrado exitosamente');
        resolve();
      };
      request.onerror = () => {
        console.error('Error al agregar usuario:', request.error);
        reject(request.error);
      };
    });

    return true;
  } catch (error) {
    console.error('Error en registrarUsuario:', error);
    return false;
  }
}

export async function loginUsuario(email, password) {
  try {
    console.log('Intentando login para:', email);
    const db = await abrirDB();
    
    const user = await new Promise((resolve, reject) => {
      const tx = db.transaction('usuarios', 'readonly');
      const store = tx.objectStore('usuarios');
      const request = store.get(email);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (user && user.password === password) {
      console.log('Login exitoso');
      return user;
    }
    
    console.log('Credenciales incorrectas');
    return null;
  } catch (error) {
    console.error('Error en loginUsuario:', error);
    return null;
  }
}