// postular.js
import { abrirDB } from './db.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('postular.js cargado');
  
  // Obtener el ID de la vacante desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const vacanteId = urlParams.get('vacante');
  
  if (!vacanteId) {
    alert('No se especificó una vacante válida');
    window.location.href = '/index.html';
    return;
  }

  // Cargar información de la vacante
  await cargarInfoVacante(vacanteId);
  
  // Prellenar datos del usuario si está logueado
  prellenarDatosUsuario();
  
  // Manejar envío del formulario
  const form = document.getElementById('postulacion-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await enviarPostulacion(vacanteId);
  });
});

async function cargarInfoVacante(vacanteId) {
  try {
    const db = await abrirDB();
    
    // Usar la forma correcta de IndexedDB con Promises
    const vacante = await new Promise((resolve, reject) => {
      const tx = db.transaction('vacantes', 'readonly');
      const store = tx.objectStore('vacantes');
      const request = store.get(Number(vacanteId));
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    if (!vacante) {
      alert('Vacante no encontrada');
      window.location.href = '/index.html';
      return;
    }
    
    // Mostrar información de la vacante
    const vacanteDetalles = document.getElementById('vacante-detalles');
    vacanteDetalles.innerHTML = `
      <div class="vacante-card-preview">
        <h4>${vacante.titulo}</h4>
        <div class="vacante-info-preview">
          <p><strong>📍 Ubicación:</strong> ${vacante.ubicacion}</p>
          <p><strong>💰 Presupuesto:</strong> $${(vacante.presupuesto || 0).toLocaleString('es-CO')} COP</p>
          ${vacante.fechaLimite ? `<p><strong>📅 Fecha límite:</strong> ${new Date(vacante.fechaLimite).toLocaleDateString('es-CO')}</p>` : ''}
        </div>
        <div class="vacante-descripcion-preview">
          <p><strong>Descripción:</strong></p>
          <p>${vacante.descripcion}</p>
        </div>
      </div>
    `;
    
  } catch (error) {
    console.error('Error al cargar la vacante:', error);
    alert('Error al cargar la información de la vacante');
  }
}

function prellenarDatosUsuario() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
  
  if (usuario) {
    // Prellenar campos con datos del usuario
    const nombreInput = document.getElementById('postular-nombre');
    const emailInput = document.getElementById('postular-email');
    const telefonoInput = document.getElementById('postular-telefono');
    const ubicacionInput = document.getElementById('postular-ubicacion');
    
    if (usuario.nombre && nombreInput) nombreInput.value = usuario.nombre;
    if (usuario.email && emailInput) emailInput.value = usuario.email;
    if (usuario.telefono && telefonoInput) telefonoInput.value = usuario.telefono;
    if (usuario.ubicacion && ubicacionInput) ubicacionInput.value = usuario.ubicacion;
  }
}

async function enviarPostulacion(vacanteId) {
  const form = document.getElementById('postulacion-form');
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
  
  // Crear objeto postulación
  const postulacion = {
    vacanteId: Number(vacanteId),
    nombre: form.nombre.value.trim(),
    email: form.email.value.trim(),
    telefono: form.telefono.value.trim(),
    ubicacion: form.ubicacion.value.trim(),
    mensaje: form.mensaje.value.trim(),
    disponibilidad: form.disponibilidad.value,
    fechaPostulacion: new Date().toISOString(),
    estado: 'pendiente', // pendiente, aceptada, rechazada
    emailPostulante: usuario ? usuario.email : form.email.value.trim()
  };
  
  try {
    // Verificar si ya se postuló a esta vacante
    const yaSePostulo = await verificarPostulacionExistente(vacanteId, postulacion.emailPostulante);
    
    if (yaSePostulo) {
      alert('Ya te has postulado a esta vacante anteriormente.');
      return;
    }
    
    // Guardar postulación en IndexedDB
    const db = await abrirDB();
    
    await new Promise((resolve, reject) => {
      const tx = db.transaction('postulaciones', 'readwrite');
      const store = tx.objectStore('postulaciones');
      const request = store.add(postulacion);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    
    console.log('Postulación guardada:', postulacion);
    
    // Mostrar modal de éxito
    mostrarModalExito();
    
  } catch (error) {
    console.error('Error al enviar postulación:', error);
    alert('Error al enviar la postulación. Por favor, intenta de nuevo.');
  }
}

async function verificarPostulacionExistente(vacanteId, emailPostulante) {
  try {
    const db = await abrirDB();
    
    const postulaciones = await new Promise((resolve, reject) => {
      const tx = db.transaction('postulaciones', 'readonly');
      const store = tx.objectStore('postulaciones');
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    return postulaciones.some(p => 
      p.vacanteId === Number(vacanteId) && 
      p.emailPostulante === emailPostulante
    );
  } catch (error) {
    console.error('Error al verificar postulación existente:', error);
    return false;
  }
}

function mostrarModalExito() {
  // Crear modal dinámicamente
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "modal-exito";

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-icon">✅</div>
      <h3>¡Postulación enviada exitosamente!</h3>
      <p>Tu postulación ha sido enviada correctamente.</p>
      <p>El empleador revisará tu información y se pondrá en contacto contigo pronto.</p>
      <button class="btn-modal" onclick="volverAlInicio()">Volver al inicio</button>
    </div>
  `;

  // Cerrar modal al hacer clic fuera
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  document.body.appendChild(modal);
}

// Función global para el botón del modal
window.volverAlInicio = function() {
  window.location.href = '/index.html';
};