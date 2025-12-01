//main.js
import { registrarUsuario, loginUsuario } from './auth.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM cargado, inicializando main.js');
  
  // MANEJO DEL REGISTRO
  const registerForm = document.getElementById('register-form'); // Usando el ID correcto del HTML
  if (registerForm) {
    console.log('Formulario de registro encontrado');
    
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Formulario de registro enviado');
      
      // Obtener datos del formulario usando los IDs correctos del HTML
      const nombre = document.getElementById('register-nombre')?.value?.trim();
      const fechaNacimiento = document.getElementById('register-fecha-nacimiento')?.value?.trim();
      const cedula = document.getElementById('register-cedula')?.value?.trim();
      const fechaExpedicion = document.getElementById('register-fecha-expedicion')?.value?.trim();
      const ciudadExpedicion = document.getElementById('register-ciudad-expedicion')?.value?.trim();
      const paisExpedicion = document.getElementById('register-pais-expedicion')?.value?.trim();
      const email = document.getElementById('register-email')?.value?.trim();
      const password = document.getElementById('register-password')?.value?.trim();
      
      console.log('Datos del formulario:', { 
        nombre, 
        fechaNacimiento, 
        cedula, 
        fechaExpedicion, 
        ciudadExpedicion, 
        paisExpedicion, 
        email, 
        password: password ? '[OCULTO]' : 'vacío' 
      });
      
      // Validaciones básicas
      if (!nombre || !fechaNacimiento || !cedula || !fechaExpedicion || !ciudadExpedicion || !paisExpedicion || !email || !password) {
        alert('Por favor completa todos los campos');
        return;
      }
      
      if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return;
      }
      
      // Validar formato de cédula (solo números)
      if (!/^\d+$/.test(cedula)) {
        alert('La cédula debe contener solo números');
        return;
      }
      
      const userData = {
        nombre,
        fechaNacimiento,
        cedula,
        fechaExpedicion,
        ciudadExpedicion,
        paisExpedicion,
        email,
        password,
        fechaRegistro: new Date().toISOString()
      };
      
      console.log('Enviando datos para registro:', userData);
      const exito = await registrarUsuario(userData);
      
      if (exito) {
        console.log('Registro exitoso, mostrando modal');
        mostrarModalRegistroExitoso();
      } else {
        alert('Error al registrar usuario. Es posible que el email ya esté en uso.');
      }
    });

    function mostrarModalRegistroExitoso() {
      console.log('Creando modal de registro exitoso');
      
      // Remover modal existente si hay uno
      const modalExistente = document.querySelector('.modal');
      if (modalExistente) {
        modalExistente.remove();
      }
      
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
        <div class="modal-content">
          <h3>¡Registro exitoso!</h3>
          <p>Tu cuenta ha sido creada correctamente</p>
          <button class="btn-modal">Aceptar</button>
        </div>
      `;
      
      const btnModal = modal.querySelector(".btn-modal");
      btnModal.addEventListener("click", () => {
        console.log('Cerrando modal y redirigiendo a login');
        modal.remove();
        window.location.href = "/html/login.html"; // Cambiado a login.html
      });
      
      // Cerrar modal al hacer click fuera
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
          window.location.href = "/html/login.html"; // Cambiado a login.html
        }
      });
      
      document.body.appendChild(modal);
      console.log('Modal agregado al DOM');
    }
    
    return; // Si encontramos el formulario de registro, salimos aquí
  }

  // MANEJO DEL LOGIN
  const loginForm = document.getElementById('login-form'); // Usando el ID correcto del HTML
  if (loginForm) {
    console.log('Formulario de login encontrado');
    
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Formulario de login enviado');
      
      const email = document.getElementById('login-email')?.value?.trim();
      const password = document.getElementById('login-password')?.value?.trim();
      
      console.log('Datos de login:', { email, password: password ? '[OCULTO]' : 'vacío' });

      if (!email || !password) {
        alert('Por favor ingresa email y contraseña');
        return;
      }

      const user = await loginUsuario(email, password);

      if (user) {
        console.log('Login exitoso, guardando en localStorage');
        localStorage.setItem('usuarioLogueado', JSON.stringify(user));
        
        // Verificar si hay una redirección pendiente (desde el botón publicar vacante)
        const redireccion = localStorage.getItem('redireccionPendiente');
        if (redireccion) {
          console.log('Hay redirección pendiente a:', redireccion);
          localStorage.removeItem('redireccionPendiente');
          window.location.href = redireccion;
        } else {
          // Login normal desde el nav - volver al index
          console.log('Login normal, redirigiendo a index');
          window.location.href = "/index.html";
        }
      } else {
        alert('Credenciales incorrectas');
      }
    });

    const goToRegister = document.getElementById('go-to-register');
    if (goToRegister) {
      goToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Redirigiendo a registro');
        window.location.href = "/html/registro.html";
      });
    }
  }
  
  console.log('Inicialización de main.js completada');
});