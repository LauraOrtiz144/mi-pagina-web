//crear-vacante.js

import { abrirDB } from './db.js';

document.addEventListener('DOMContentLoaded', async () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

  // Si no hay usuario logueado, redirigir al login
  if (!usuario) {
    localStorage.setItem("redireccionPendiente", "/html/crear-vacante.html");
    window.location.href = '/html/login.html';
    return;
  }

  const form = document.getElementById('crear-vacante-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevaVacante = {
      titulo: form.titulo.value.trim(),
      descripcion: form.descripcion.value.trim(),
      presupuesto: Number(form.presupuesto.value), 
      ubicacion: form.ubicacion.value.trim(),
      fechaLimite: form.fechaLimite.value || null, 
      emailUsuario: usuario.email,
      fechaCreacion: new Date().toISOString(), 
      estado: 'activa' 
    };

    try {
      const db = await abrirDB();
      const tx = db.transaction('vacantes', 'readwrite');
      const store = tx.objectStore('vacantes');
      await store.add(nuevaVacante);
      await tx.complete;

      // Mostrar modal de éxito
      mostrarModalExito();
      
    } catch (err) {
      console.error('Error al guardar la vacante:', err);
      alert('Ocurrió un error al guardar la vacante');
    }
  });
});

function mostrarModalExito() {
  // Remover modal existente si hay uno
  const modalExistente = document.querySelector('.modal');
  if (modalExistente) {
    modalExistente.remove();
  }
  
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-icon">✅</div>
      <h3>¡Vacante publicada con éxito!</h3>
      <p>Tu vacante ha sido publicada correctamente y ya está disponible para recibir postulaciones.</p>
      <button class="btn-modal">Volver al inicio</button>
    </div>
  `;
  
  const btnModal = modal.querySelector(".btn-modal");
  btnModal.addEventListener("click", () => {
    modal.remove();
    window.location.href = "/index.html";
  });
  
  // Cerrar modal al hacer click fuera
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      window.location.href = "/index.html";
    }
  });
  
  document.body.appendChild(modal);
}