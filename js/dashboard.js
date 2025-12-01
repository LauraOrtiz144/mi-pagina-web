//dashboard.js 
document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard JS cargado");

  const btnPublicar = document.getElementById("btn-publicar");
  console.log("Botón publicar encontrado:", btnPublicar);

  if (btnPublicar) {
    btnPublicar.addEventListener("click", (e) => {
      console.log("Click en botón publicar");
      e.preventDefault();

      const userLogueado = localStorage.getItem("usuarioLogueado");
      console.log("Usuario logueado:", userLogueado);

      if (userLogueado) {
        window.location.href = "/html/crear-vacante.html";
      } else {
        console.log("Mostrando modal de login");
        mostrarModalLogin("/html/crear-vacante.html");
      }
    });
  } else {
    console.error("No se encontró el botón btn-publicar");
  }

  const btnPostular = document.getElementById("btn-postular");
  if (btnPostular) {
    btnPostular.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Click en botón postular");
      mostrarVacantesDisponibles();
    });
  }

  const enlaceTrabajos = Array.from(document.querySelectorAll('nav a')).find(
      a => a.textContent.trim() === "Trabajos"
  );

  if (enlaceTrabajos) {
    enlaceTrabajos.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Click en enlace Trabajos");
      mostrarVacantesDisponibles();
    });
  }

  const btnCrearCuenta = document.getElementById("crearCuentaBtn");
  if (btnCrearCuenta) {
    btnCrearCuenta.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/html/registro.html";
    });
  }

  const enlaceLogin = document.getElementById("enlaceLogin");
  if (enlaceLogin) {
    enlaceLogin.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/html/login.html";
    });
  }

  // ENLACE DE INICIO - NUEVO
  const enlaceInicio = Array.from(document.querySelectorAll('nav a')).find(
    a => a.textContent.trim() === "Inicio"
  );

  if (enlaceInicio) {
    enlaceInicio.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Click en enlace Inicio");
      mostrarContenidoInicial();
    });
  }

  const userLogueadoObj = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const navList = document.getElementById("nav-links");
  const loginItem = document.querySelector(".login1");

  if (userLogueadoObj && navList) {
    if (loginItem) loginItem.remove();

    if (!document.getElementById("logout-link")) {
      const logoutLi = document.createElement("li");
      const logoutLink = document.createElement("a");
      logoutLink.href = "#";
      logoutLink.textContent = "Cerrar sesión";
      logoutLink.id = "logout-link";

      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "/index.html";
      });

      logoutLi.appendChild(logoutLink);
      navList.appendChild(logoutLi);
    }
  }

  // CORREGIR LA BÚSQUEDA DEL BOTÓN SOPORTE
  const btnSoporte = document.getElementById("btn-soporte");
  
  if (btnSoporte) {
    btnSoporte.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Click en botón Soporte");
      mostrarSeccionSoporte();
    });
  } else {
    console.error("No se encontró el botón btn-soporte");
  }

  const enlaceSoporte = Array.from(document.querySelectorAll('nav a')).find(
    a => a.textContent.trim() === "Soporte"
  );

  if (enlaceSoporte) {
    enlaceSoporte.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Click en enlace Soporte desde navegación");
      mostrarSeccionSoporte();
    });
  }

  // Guardar contenido original al cargar la página
  guardarContenidoOriginal();

  const enlacePerfil = Array.from(document.querySelectorAll('nav a')).find(
    a => a.textContent.trim() === "Mi perfil"
  );

  if (enlacePerfil) {
    enlacePerfil.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Click en enlace Mi Perfil");
      
      const userLogueado = localStorage.getItem("usuarioLogueado");
      if (userLogueado) {
        mostrarSeccionPerfil();
      } else {
        mostrarModalLogin();
      }
    });
  }
});

// FUNCIÓN PARA GUARDAR EL CONTENIDO ORIGINAL
function guardarContenidoOriginal() {
  const main = document.querySelector('main');
  const heroSection = document.querySelector('.hero-section');
  
  if (main && !window.contenidoOriginalGuardado) {
    window.contenidoOriginalMain = main.innerHTML;
    window.contenidoOriginalGuardado = true;
    console.log("Contenido original guardado");
  }
  
  if (heroSection && !window.heroOriginalGuardado) {
    window.heroOriginal = heroSection.cloneNode(true);
    window.heroOriginalGuardado = true;
    console.log("Hero section original guardado");
  }
}

// FUNCIÓN MEJORADA PARA OCULTAR TODAS LAS SECCIONES
function ocultarTodasLasSecciones() {
  console.log("Ocultando todas las secciones");
  
  // Ocultar sección de vacantes
  const vacantesContainer = document.getElementById('vacantes-container');
  if (vacantesContainer) {
    vacantesContainer.style.display = 'none';
    console.log("Sección de vacantes ocultada");
  }

  // Ocultar hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.style.display = 'none';
    console.log("Hero section ocultada");
  }

  // Ocultar main si tiene contenido de soporte
  const main = document.querySelector('main');
  if (main && main.querySelector('.support-section')) {
    main.innerHTML = '';
    console.log("Contenido de soporte removido del main");
  }
}

// NUEVA FUNCIÓN PARA MOSTRAR CONTENIDO INICIAL
function mostrarContenidoInicial() {
  console.log("Mostrando contenido inicial");
  
  // Ocultar todas las secciones primero
  ocultarTodasLasSecciones();

  // Restaurar contenido original del main
  const main = document.querySelector('main');
  if (main && window.contenidoOriginalMain) {
    main.innerHTML = window.contenidoOriginalMain;
    main.style.display = 'block';
    main.style.opacity = '1';
    main.style.transform = 'translateY(0)';
    console.log("Main restaurado");
  }

  // Restaurar hero section
  if (window.heroOriginal) {
    const heroExistente = document.querySelector('.hero-section');
    if (heroExistente) {
      heroExistente.remove();
    }
    
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.parentNode.insertBefore(window.heroOriginal.cloneNode(true), mainElement);
      console.log("Hero section restaurado");
    }
  }

  // Re-agregar event listeners que se perdieron
  setTimeout(() => {
    reactivarEventListeners();
  }, 100);
}

// FUNCIÓN PARA REACTIVAR EVENT LISTENERS DESPUÉS DE RESTAURAR CONTENIDO
function reactivarEventListeners() {
  const btnPublicar = document.getElementById("btn-publicar");
  if (btnPublicar) {
    btnPublicar.addEventListener("click", (e) => {
      e.preventDefault();
      const userLogueado = localStorage.getItem("usuarioLogueado");
      if (userLogueado) {
        window.location.href = "/html/crear-vacante.html";
      } else {
        mostrarModalLogin("/html/crear-vacante.html");
      }
    });
  }

  const btnPostular = document.getElementById("btn-postular");
  if (btnPostular) {
    btnPostular.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarVacantesDisponibles();
    });
  }

  const btnCrearCuenta = document.getElementById("crearCuentaBtn");
  if (btnCrearCuenta) {
    btnCrearCuenta.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/html/registro.html";
    });
  }
}

async function mostrarVacantesDisponibles() {
  console.log("Mostrando vacantes disponibles");

  // Ocultar todas las secciones primero
  ocultarTodasLasSecciones();

  const main = document.querySelector('main');
  
  if (main) {
    main.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    main.style.opacity = '0';
    main.style.transform = 'translateY(20px)';
    setTimeout(() => {
      main.style.display = 'none';
    }, 300);
  }

  setTimeout(() => {
    const vacantesContainer = document.getElementById('vacantes-container');
    if (vacantesContainer) {
      vacantesContainer.style.display = 'block';
      vacantesContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      vacantesContainer.style.opacity = '0';
      vacantesContainer.style.transform = 'translateY(20px)';

      cargarVacantes();

      setTimeout(() => {
        vacantesContainer.style.opacity = '1';
        vacantesContainer.style.transform = 'translateY(0)';
      }, 50);
    }
  }, 300);
}

async function cargarVacantes() {
  try {
    const vacantes = await obtenerTodasLasVacantes();
    mostrarListaVacantes(vacantes);
  } catch (error) {
    console.error('Error al cargar vacantes:', error);
    mostrarMensajeError();
  }
}

async function obtenerTodasLasVacantes() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('IWorkDB', 2);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['vacantes'], 'readonly');
      const store = transaction.objectStore('vacantes');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result || []);
      };

      getAllRequest.onerror = () => {
        reject(getAllRequest.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

function mostrarListaVacantes(vacantes) {
  const listaVacantes = document.getElementById('lista-vacantes');
  if (!listaVacantes) return;

  if (vacantes.length === 0) {
    listaVacantes.innerHTML = `
      <div class="no-vacantes">
        <div class="no-vacantes-icon">📋</div>
        <h3>No hay vacantes disponibles</h3>
        <p>¡Sé el primero en publicar una vacante!</p>
      </div>
    `;
    return;
  }

  const titulo = document.querySelector('#vacantes-container h3');
  if (titulo) {
    titulo.textContent = `Vacantes Disponibles (${vacantes.length})`;
  }

  // Ordenar vacantes por fecha de creación (más recientes primero)
  const vacantesOrdenadas = vacantes.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));

  const vacantesHTML = vacantesOrdenadas.map(vacante => `
    <div class="vacante-card" data-id="${vacante.id}">
      <div class="vacante-header">
        <h4 class="vacante-titulo">${vacante.titulo}</h4>
        <span class="vacante-estado">${vacante.estado || 'Activa'}</span>
      </div>
      
      <div class="vacante-info">
        <div class="vacante-detalle">
          <span class="detalle-label">📍 Ubicación:</span>
          <span class="detalle-valor">${vacante.ubicacion}</span>
        </div>
        
        <div class="vacante-detalle">
          <span class="detalle-label">💰 Presupuesto:</span>
          <span class="detalle-valor">$${(vacante.presupuesto || 0).toLocaleString('es-CO')} COP</span>
        </div>
        
        ${vacante.fechaLimite ? `
        <div class="vacante-detalle">
          <span class="detalle-label">📅 Fecha límite:</span>
          <span class="detalle-valor">${new Date(vacante.fechaLimite).toLocaleDateString('es-CO')}</span>
        </div>` : ''}
      </div>
      
      <div class="vacante-descripcion">
        <p>${vacante.descripcion}</p>
      </div>
      
      <div class="vacante-footer">
        <div class="vacante-fecha">
          Publicado: ${new Date(vacante.fechaCreacion).toLocaleDateString('es-CO')}
        </div>
        <button class="btn-postular-vacante">💼 Postularme</button>
      </div>
    </div>
  `).join('');

  listaVacantes.innerHTML = vacantesHTML;

  document.getElementById('lista-vacantes').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-postular-vacante')) {
      const vacanteId = e.target.closest('.vacante-card').dataset.id;
      postularseAVacante(parseInt(vacanteId));
    }
  });
}

function mostrarMensajeError() {
  const listaVacantes = document.getElementById('lista-vacantes');
  if (listaVacantes) {
    listaVacantes.innerHTML = `
      <div class="error-vacantes">
        <div class="error-icon">⚠️</div>
        <h3>Error al cargar las vacantes</h3>
        <p>Por favor, intenta de nuevo más tarde.</p>
        <button onclick="cargarVacantes()" class="btn-retry">Reintentar</button>
      </div>
    `;
  }
}

function postularseAVacante(vacanteId) {
  const user = localStorage.getItem("usuarioLogueado");
  if (!user) {
    mostrarModalLogin(`/html/postular.html?vacante=${vacanteId}`);
    return;
  }

  window.location.href = `/html/postular.html?vacante=${vacanteId}`;
}

function mostrarModalPostulacion(vacanteId) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-icon">✅</div>
      <h3>¡Postulación enviada!</h3>
      <p>Te has postulado exitosamente a esta vacante.</p>
      <p>El empleador revisará tu perfil y se pondrá en contacto contigo pronto.</p>
      <button class="btn-modal">Entendido</button>
    </div>
  `;

  const btnModal = modal.querySelector(".btn-modal");
  btnModal.addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  document.body.appendChild(modal);
}

function mostrarModalLogin(redireccion = null) {
  console.log("Ejecutando mostrarModalLogin con redirección:", redireccion);

  if (document.querySelector(".modal")) {
    console.log("Modal ya existe, no creando duplicado");
    return;
  }

  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <h3>¡Atención!</h3>
      <p>Debes iniciar sesión para continuar</p>
      <div class="modal-buttons">
        <button class="btn-modal btn-modal-login">Ir al inicio de sesión</button>
        <button class="btn-modal btn-modal-cancel">Cancelar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  console.log("Modal agregado al DOM");

  const btnLogin = modal.querySelector(".btn-modal-login");
  btnLogin.addEventListener("click", () => {
    console.log("Click en botón ir al login");
    if (redireccion) {
      localStorage.setItem("redireccionPendiente", redireccion);
      console.log("Redirección guardada:", redireccion);
    }
    window.location.href = "/html/login.html";
  });

  const btnCancel = modal.querySelector(".btn-modal-cancel");
  btnCancel.addEventListener("click", () => {
    console.log("Click en botón cancelar");
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// FUNCIÓN PARA MOSTRAR SECCIÓN DE SOPORTE
function mostrarSeccionSoporte() {
  console.log("Mostrando sección de soporte");
  
  // Ocultar todas las secciones primero
  ocultarTodasLasSecciones();

  // Obtener o crear el elemento main
  let main = document.querySelector("main");
  if (!main) {
    main = document.createElement("main");
    document.body.appendChild(main);
  }

  // Limpiar el contenido del main
  main.innerHTML = '';
  main.style.display = 'block';
  main.style.opacity = '1';
  main.style.transform = 'translateY(0)';

  // Insertar el contenido de soporte
  main.innerHTML = `
    <section class="support-section">
      <div class="container">
        <!-- Header de Soporte -->
        <div class="support-header text-center">
          <div class="support-icon">🤝</div>
          <h2 class="section-title">Centro de Ayuda</h2>
          <p class="section-subtitle">Estamos aquí para resolver todas tus dudas y ayudarte en cada paso</p>
        </div>

        <!-- Contacto Rápido -->
        <div class="quick-contact">
          <div class="contact-cards">
            <div class="contact-card">
              <div class="contact-icon">📧</div>
              <h4>Email</h4>
              <p>soporte@iwork.com</p>
              <small>Respuesta en 24h</small>
            </div>
            <div class="contact-card">
              <div class="contact-icon">💬</div>
              <h4>WhatsApp</h4>
              <p>+57 300 123 4567</p>
              <small>Lun-Vie 8am-6pm</small>
            </div>
            <div class="contact-card">
              <div class="contact-icon">📞</div>
              <h4>Teléfono</h4>
              <p>01 800 123 456</p>
              <small>Lun-Vie 8am-8pm</small>
            </div>
          </div>
        </div>

        <!-- Preguntas Frecuentes -->
        <div class="faq-section">
          <h3 class="section-title text-center">Preguntas Frecuentes</h3>
          <div class="faq-container">
            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>¿Cómo me registro en I-Work?</span>
                <div class="faq-icon">+</div>
              </div>
              <div class="faq-answer">
                <p>Es muy sencillo: haz clic en "Crear Cuenta Gratis", completa tus datos básicos, agrega tus habilidades y servicios. ¡En menos de 5 minutos estarás listo para empezar!</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>¿Cómo publico mis servicios?</span>
                <div class="faq-icon">+</div>
              </div>
              <div class="faq-answer">
                <p>Una vez registrado, ve a "Publicar vacante", describe tu servicio, establece tu precio, define tu zona de trabajo y publica. Los clientes cercanos podrán encontrarte fácilmente.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>¿Cómo funciona el sistema de pagos?</span>
                <div class="faq-icon">+</div>
              </div>
              <div class="faq-answer">
                <p>Los pagos son 100% seguros. El cliente deposita el dinero en I-Work cuando acepta tu propuesta. Una vez completado el trabajo y confirmado por ambas partes, recibimos tu pago en máximo 24 horas.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>¿Qué comisión cobra I-Work?</span>
                <div class="faq-icon">+</div>
              </div>
              <div class="faq-answer">
                <p>Cobramos una comisión del 10% por cada trabajo completado. No hay cuotas mensuales ni costos ocultos. Solo ganas cuando trabajas.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>¿Puedo trabajar en varias ciudades?</span>
                <div class="faq-icon">+</div>
              </div>
              <div class="faq-answer">
                <p>¡Claro! Puedes configurar múltiples zonas de trabajo en tu perfil. Esto te permitirá recibir solicitudes de diferentes áreas donde puedas ofrecer tus servicios.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question" onclick="toggleFAQ(this)">
                <span>¿Qué hago si tengo un problema con un cliente?</span>
                <div class="faq-icon">+</div>
              </div>
              <div class="faq-answer">
                <p>Nuestro equipo de soporte está aquí para mediar cualquier conflicto. Contáctanos inmediatamente y resolveremos la situación de manera justa para ambas partes.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Categorías de Ayuda -->
        <div class="help-categories">
          <h3 class="section-title text-center">¿En qué te podemos ayudar?</h3>
          <div class="categories-grid">
            <div class="category-card">
              <div class="category-icon">👤</div>
              <h4>Cuenta y Perfil</h4>
              <p>Registro, configuración de perfil, verificación de identidad</p>
            </div>
            <div class="category-card">
              <div class="category-icon">💼</div>
              <h4>Trabajos y Servicios</h4>
              <p>Publicar servicios, encontrar trabajos, gestionar propuestas</p>
            </div>
            <div class="category-card">
              <div class="category-icon">💳</div>
              <h4>Pagos y Facturación</h4>
              <p>Métodos de pago, retiros, historial de transacciones</p>
            </div>
            <div class="category-card">
              <div class="category-icon">⚙️</div>
              <h4>Problemas Técnicos</h4>
              <p>App no funciona, errores de conexión, bugs reportados</p>
            </div>
            <div class="category-card">
              <div class="category-icon">🛡️</div>
              <h4>Seguridad</h4>
              <p>Reportar usuarios, fraudes, problemas de seguridad</p>
            </div>
            <div class="category-card">
              <div class="category-icon">📊</div>
              <h4>Estadísticas</h4>
              <p>Calificaciones, historial de trabajos, métricas de perfil</p>
            </div>
          </div>
        </div>

        <!-- Formulario de Contacto -->
        <div class="contact-form-section">
          <h3 class="section-title text-center">¿No encontraste tu respuesta?</h3>
          <p class="text-center section-subtitle">Envíanos tu consulta y te responderemos lo antes posible</p>
          
          <form class="contact-form" id="supportForm">
            <div class="form-row">
              <div class="form-group">
                <label for="nombre">Nombre completo</label>
                <input type="text" id="nombre" name="nombre" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="categoria">Categoría de consulta</label>
              <select id="categoria" name="categoria" required>
                <option value="">Selecciona una categoría</option>
                <option value="cuenta">Cuenta y Perfil</option>
                <option value="trabajos">Trabajos y Servicios</option>
                <option value="pagos">Pagos y Facturación</option>
                <option value="tecnico">Problemas Técnicos</option>
                <option value="seguridad">Seguridad</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="asunto">Asunto</label>
              <input type="text" id="asunto" name="asunto" required>
            </div>
            
            <div class="form-group">
              <label for="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows="5" placeholder="Describe tu consulta con el mayor detalle posible..." required></textarea>
            </div>
            
            <button type="submit" class="btn-primary center-button">Enviar Consulta</button>
          </form>
        </div>
      </div>
    </section>
  `;

  // Agrega el event listener para el formulario después de insertar el HTML
  setTimeout(() => {
    const form = document.getElementById('supportForm');
    if (form) {
      form.addEventListener('submit', handleSupportForm);
      console.log("Event listener del formulario de soporte agregado");
    }
  }, 100);

  console.log("Sección de soporte cargada correctamente");
}

// Función para toggle de FAQ
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const answer = faqItem.querySelector('.faq-answer');
  const icon = element.querySelector('.faq-icon');
  
  faqItem.classList.toggle('active');
  
  if (faqItem.classList.contains('active')) {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    icon.textContent = '−';
  } else {
    answer.style.maxHeight = '0';
    icon.textContent = '+';
  }
}

function handleSupportForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  setTimeout(() => {
    e.target.reset();

    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-icon">✅</div>
        <h3>¡Consulta enviada!</h3>
        <p>Tu consulta ha sido enviada exitosamente.</p>
        <p>Te responderemos en las próximas 24 horas.</p>
        <button class="btn-modal">Entendido</button>
      </div>
    `;

    const btnModal = modal.querySelector(".btn-modal");
    btnModal.addEventListener("click", () => {
      modal.remove();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    document.body.appendChild(modal);
  }, 1000);
}

// FUNCIÓN PARA MOSTRAR SECCIÓN DE PERFIL
function mostrarSeccionPerfil() {
  console.log("Mostrando sección de perfil");
  
  // Ocultar todas las secciones primero
  ocultarTodasLasSecciones();

  // Obtener o crear el elemento main
  let main = document.querySelector("main");
  if (!main) {
    main = document.createElement("main");
    document.body.appendChild(main);
  }

  // Limpiar el contenido del main
  main.innerHTML = '';
  main.style.display = 'block';
  main.style.opacity = '1';
  main.style.transform = 'translateY(0)';

  // Obtener datos del usuario
  const userLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
  
  // Insertar el contenido del perfil
  main.innerHTML = `
    <section class="profile-section">
      <div class="container">
        <!-- Header de Perfil -->
        <div class="profile-header">
          <div class="profile-avatar-container">
            <div class="profile-avatar" id="profile-avatar">
              <div class="avatar-placeholder">
                <span class="avatar-initials">${getInitials(userLogueado.nombre)}</span>
              </div>
            </div>
          </div>
          
          <div class="profile-info">
            <h2 class="profile-name">${userLogueado.nombre}</h2>
            <p class="profile-email">${userLogueado.email}</p>
            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-number" id="postulaciones-count">0</span>
                <span class="stat-label">Postulaciones</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">4.8⭐</span>
                <span class="stat-label">Calificación</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">12</span>
                <span class="stat-label">Trabajos</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navegación del Perfil -->
        <div class="profile-navigation">
          <button class="nav-tab active" data-tab="postulaciones">Mis Postulaciones</button>
          <button class="nav-tab" data-tab="datos">Mis Datos</button>
        </div>

        <!-- Contenido de las Pestañas -->
        <div class="profile-content">
          <!-- Pestaña Postulaciones -->
          <div class="tab-content active" id="postulaciones-tab">
            <div class="postulaciones-container">
              <div class="postulaciones-header">
                <h3>Mis Postulaciones</h3>
                <div class="postulaciones-filters">
                  <button class="filter-btn active" data-filter="todas">Todas</button>
                  <button class="filter-btn" data-filter="pendiente">Pendientes</button>
                  <button class="filter-btn" data-filter="aceptada">Aceptadas</button>
                  <button class="filter-btn" data-filter="rechazada">Rechazadas</button>
                </div>
              </div>
              <div id="lista-postulaciones" class="postulaciones-list">
                <!-- Las postulaciones se cargarán aquí dinámicamente -->
              </div>
            </div>
          </div>

          <!-- Pestaña Datos -->
          <div class="tab-content" id="datos-tab">
            <div class="datos-container">
              <h3>Información Personal</h3>
              <div class="datos-grid">
                <div class="dato-item">
                  <label>Nombre completo</label>
                  <span>${userLogueado.nombre}</span>
                </div>
                <div class="dato-item">
                  <label>Email</label>
                  <span>${userLogueado.email}</span>
                </div>
                <div class="dato-item">
                  <label>Cédula</label>
                  <span>${userLogueado.cedula || 'No registrada'}</span>
                </div>
                <div class="dato-item">
                  <label>Fecha de nacimiento</label>
                  <span>${userLogueado.fechaNacimiento ? new Date(userLogueado.fechaNacimiento).toLocaleDateString('es-CO') : 'No registrada'}</span>
                </div>
                <div class="dato-item">
                  <label>Ciudad de expedición</label>
                  <span>${userLogueado.ciudadExpedicion || 'No registrada'}</span>
                </div>
                <div class="dato-item">
                  <label>País</label>
                  <span>${userLogueado.paisExpedicion || 'No registrado'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Agregar event listeners después de insertar el HTML
  setTimeout(() => {
    setupProfileEventListeners();
    cargarPostulaciones();
  }, 100);

  console.log("Sección de perfil cargada correctamente");
}

// FUNCIÓN PARA CONFIGURAR EVENT LISTENERS DEL PERFIL
function setupProfileEventListeners() {
  // Event listener para las pestañas
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabName = e.target.dataset.tab;
      switchTab(tabName);
    });
  });

  // Event listener para los filtros de postulaciones
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.target.dataset.filter;
      filtrarPostulaciones(filter);
      
      // Actualizar botón activo
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
    });
  });
}

// FUNCIÓN PARA CAMBIAR ENTRE PESTAÑAS
function switchTab(tabName) {
  // Ocultar todas las pestañas
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Mostrar la pestaña seleccionada
  document.getElementById(`${tabName}-tab`).classList.add('active');
  
  // Actualizar navegación
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// FUNCIÓN PARA OBTENER INICIALES DEL NOMBRE
function getInitials(nombre) {
  return nombre
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// FUNCIÓN PARA CARGAR POSTULACIONES CON INFORMACIÓN COMPLETA DE VACANTES
async function cargarPostulaciones() {
  try {
    console.log("Iniciando carga de postulaciones...");
    const userLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    console.log("Usuario logueado:", userLogueado.email);
    
    const postulaciones = await obtenerPostulacionesUsuario(userLogueado.email);
    console.log("Postulaciones obtenidas:", postulaciones);
    
    // Obtener información completa de las vacantes
    const postulacionesConVacantes = await obtenerPostulacionesConInfoVacantes(postulaciones);
    
    // Actualizar contador
    document.getElementById('postulaciones-count').textContent = postulacionesConVacantes.length;
    
    mostrarListaPostulaciones(postulacionesConVacantes);
  } catch (error) {
    console.error('Error al cargar postulaciones:', error);
    mostrarMensajeErrorPostulaciones();
  }
}

// FUNCIÓN PARA OBTENER POSTULACIONES DEL USUARIO
async function obtenerPostulacionesUsuario(emailUsuario) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('IWorkDB', 2);

    request.onsuccess = (event) => {
      const db = event.target.result;
      
      // Verificar si existe el store de postulaciones
      if (!db.objectStoreNames.contains('postulaciones')) {
        console.log("Store de postulaciones no existe");
        resolve([]);
        return;
      }
      
      const transaction = db.transaction(['postulaciones'], 'readonly');
      const store = transaction.objectStore('postulaciones');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const todasPostulaciones = getAllRequest.result || [];
        console.log("Todas las postulaciones:", todasPostulaciones);
        
        // Filtrar postulaciones del usuario actual
        const postulacionesUsuario = todasPostulaciones.filter(post => 
          post.emailPostulante === emailUsuario
        );
        console.log("Postulaciones del usuario:", postulacionesUsuario);
        
        resolve(postulacionesUsuario);
      };

      getAllRequest.onerror = () => {
        console.error("Error al obtener postulaciones:", getAllRequest.error);
        reject(getAllRequest.error);
      };
    };

    request.onerror = () => {
      console.error("Error al abrir DB:", request.error);
      reject(request.error);
    };
  });
}

// FUNCIÓN PARA OBTENER POSTULACIONES CON INFORMACIÓN COMPLETA DE VACANTES
async function obtenerPostulacionesConInfoVacantes(postulaciones) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('IWorkDB', 2);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('vacantes')) {
        console.log("Store de vacantes no existe");
        resolve(postulaciones);
        return;
      }
      
      const transaction = db.transaction(['vacantes'], 'readonly');
      const store = transaction.objectStore('vacantes');
      
      const postulacionesPromises = postulaciones.map(postulacion => {
        return new Promise((resolvePost) => {
          const getRequest = store.get(postulacion.vacanteId);
          
          getRequest.onsuccess = () => {
            const vacante = getRequest.result;
            if (vacante) {
              // Combinar datos de postulación con datos de vacante
              const postulacionCompleta = {
                ...postulacion,
                // Información de la vacante
                tituloVacante: vacante.titulo,
                descripcionVacante: vacante.descripcion,
                ubicacionVacante: vacante.ubicacion,
                presupuestoVacante: vacante.presupuesto,
                fechaLimiteVacante: vacante.fechaLimite,
                estadoVacante: vacante.estado
              };
              resolvePost(postulacionCompleta);
            } else {
              // Si no se encuentra la vacante, mantener datos originales
              resolvePost({
                ...postulacion,
                tituloVacante: 'Vacante no encontrada',
                descripcionVacante: 'Esta vacante ya no está disponible',
                ubicacionVacante: 'No disponible',
                presupuestoVacante: 0,
                fechaLimiteVacante: null,
                estadoVacante: 'Eliminada'
              });
            }
          };
          
          getRequest.onerror = () => {
            console.error("Error al obtener vacante:", getRequest.error);
            resolvePost(postulacion);
          };
        });
      });
      
      Promise.all(postulacionesPromises)
        .then(postulacionesCompletas => {
          resolve(postulacionesCompletas);
        })
        .catch(error => {
          console.error("Error al procesar postulaciones:", error);
          resolve(postulaciones);
        });
    };
    
    request.onerror = () => {
      console.error("Error al abrir DB:", request.error);
      reject(request.error);
    };
  });
}

// FUNCIÓN PARA MOSTRAR LISTA DE POSTULACIONES CON INFORMACIÓN COMPLETA
function mostrarListaPostulaciones(postulaciones, filtro = 'todas') {
  const listaPostulaciones = document.getElementById('lista-postulaciones');
  if (!listaPostulaciones) return;

  console.log("Mostrando postulaciones con filtro:", filtro);
  console.log("Postulaciones recibidas:", postulaciones);

  // Filtrar postulaciones según el filtro activo
  let postulacionesFiltradas = postulaciones;
  if (filtro !== 'todas') {
    postulacionesFiltradas = postulaciones.filter(post => post.estado === filtro);
  }

  console.log("Postulaciones filtradas:", postulacionesFiltradas);

  if (postulacionesFiltradas.length === 0) {
    listaPostulaciones.innerHTML = `
      <div class="no-postulaciones">
        <div class="no-postulaciones-icon">📋</div>
        <h4>No tienes postulaciones ${filtro === 'todas' ? '' : filtro}</h4>
        <p>Cuando te postules a vacantes, aparecerán aquí.</p>
        <button class="btn-primary" onclick="mostrarVacantesDisponibles()">Ver Vacantes</button>
      </div>
    `;
    return;
  }

  const postulacionesHTML = postulacionesFiltradas.map(postulacion => `
    <div class="postulacion-card" data-estado="${postulacion.estado}">
      <div class="postulacion-header">
        <h4 class="postulacion-titulo">${postulacion.tituloVacante || 'Vacante'}</h4>
        <span class="postulacion-estado estado-${postulacion.estado || 'pendiente'}">
          ${getEstadoLabel(postulacion.estado || 'pendiente')}
        </span>
      </div>
      
      <!-- Información de la Vacante -->
      <div class="vacante-info-section">
        <h5 class="info-section-title">📋 Información de la Vacante</h5>
        <div class="vacante-info">
          <div class="vacante-detalle">
            <span class="detalle-label">📍 Ubicación:</span>
            <span class="detalle-valor">${postulacion.ubicacionVacante || 'No especificada'}</span>
          </div>
          
          <div class="vacante-detalle">
            <span class="detalle-label">💰 Presupuesto:</span>
            <span class="detalle-valor">$${(postulacion.presupuestoVacante || 0).toLocaleString('es-CO')} COP</span>
          </div>
          
          ${postulacion.fechaLimiteVacante ? `
          <div class="vacante-detalle">
            <span class="detalle-label">📅 Fecha límite:</span>
            <span class="detalle-valor">${new Date(postulacion.fechaLimiteVacante).toLocaleDateString('es-CO')}</span>
          </div>` : ''}
        </div>
        
        ${postulacion.descripcionVacante ? `
        <div class="vacante-descripcion">
          <span class="detalle-label">📝 Descripción:</span>
          <p class="descripcion-texto">${postulacion.descripcionVacante}</p>
        </div>` : ''}
      </div>
      
      <!-- Información de tu Postulación -->
      <div class="postulacion-info-section">
        <h5 class="info-section-title">👤 Tu Postulación</h5>
        <div class="postulacion-info">
          <div class="postulacion-detalle">
            <span class="detalle-label">📅 Fecha de postulación:</span>
            <span class="detalle-valor">${new Date(postulacion.fechaPostulacion).toLocaleDateString('es-CO')}</span>
          </div>
          
          <div class="postulacion-detalle">
            <span class="detalle-label">📞 Teléfono:</span>
            <span class="detalle-valor">${postulacion.telefono || 'No especificado'}</span>
          </div>
          
          <div class="postulacion-detalle">
            <span class="detalle-label">⏰ Disponibilidad:</span>
            <span class="detalle-valor">${getDisponibilidadLabel(postulacion.disponibilidad)}</span>
          </div>
          
          ${postulacion.mensaje ? `
          <div class="postulacion-mensaje">
            <span class="detalle-label">💬 Tu mensaje:</span>
            <p class="mensaje-texto">"${postulacion.mensaje}"</p>
          </div>` : ''}
        </div>
      </div>
      
      <div class="postulacion-acciones">
        <button class="btn-secondary btn-small" onclick="verDetalleVacante(${postulacion.vacanteId})">
          Ver Vacante Completa
        </button>
        ${postulacion.estado === 'pendiente' ? 
          `<button class="btn-danger btn-small" onclick="cancelarPostulacion(${postulacion.id})">
            Cancelar Postulación
          </button>` : ''
        }
      </div>
    </div>
  `).join('');

  listaPostulaciones.innerHTML = postulacionesHTML;
}

// FUNCIÓN PARA OBTENER ETIQUETA DEL ESTADO
function getEstadoLabel(estado) {
  const estados = {
    'pendiente': 'Pendiente',
    'aceptada': 'Aceptada',
    'rechazada': 'Rechazada',
    'cancelada': 'Cancelada'
  };
  return estados[estado] || 'Pendiente';
}

// FUNCIÓN PARA OBTENER ETIQUETA DE DISPONIBILIDAD
function getDisponibilidadLabel(disponibilidad) {
  const disponibilidades = {
    'inmediata': 'Inmediata',
    'una-semana': 'En una semana',
    'dos-semanas': 'En dos semanas',
    'un-mes': 'En un mes',
    'flexible': 'Flexible'
  };
  return disponibilidades[disponibilidad] || 'No especificada';
}

// FUNCIÓN PARA FILTRAR POSTULACIONES
async function filtrarPostulaciones(filtro) {
  try {
    const userLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const postulaciones = await obtenerPostulacionesUsuario(userLogueado.email);
    const postulacionesConVacantes = await obtenerPostulacionesConInfoVacantes(postulaciones);
    mostrarListaPostulaciones(postulacionesConVacantes, filtro);
  } catch (error) {
    console.error('Error al filtrar postulaciones:', error);
    mostrarMensajeErrorPostulaciones();
  }
}

// FUNCIÓN PARA MOSTRAR MENSAJE
function mostrarMensaje(mensaje, tipo = 'info') {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const iconos = {
    'success': '✅',
    'error': '❌',
    'info': 'ℹ️'
  };

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-icon">${iconos[tipo]}</div>
      <h3>${tipo === 'error' ? 'Error' : tipo === 'success' ? 'Éxito' : 'Información'}</h3>
      <p>${mensaje}</p>
      <button class="btn-modal">Entendido</button>
    </div>
  `;

  const btnModal = modal.querySelector(".btn-modal");
  btnModal.addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  document.body.appendChild(modal);
}

// FUNCIÓN PARA MOSTRAR ERROR DE POSTULACIONES
function mostrarMensajeErrorPostulaciones() {
  const listaPostulaciones = document.getElementById('lista-postulaciones');
  if (listaPostulaciones) {
    listaPostulaciones.innerHTML = `
      <div class="error-postulaciones">
        <div class="error-icon">⚠️</div>
        <h4>Error al cargar las postulaciones</h4>
        <p>Por favor, intenta de nuevo más tarde.</p>
        <button onclick="cargarPostulaciones()" class="btn-retry">Reintentar</button>
      </div>
    `;
  }
}