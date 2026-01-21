// ==========================================
// ESPERAR A QUE EL DOM ESTÉ COMPLETAMENTE CARGADO
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // MENÚ HAMBURGUESA PARA MÓVILES
    // ==========================================
    
    // Obtener elementos del DOM
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para abrir/cerrar el menú móvil
    menuToggle.addEventListener('click', function() {
        // Alternar clase 'active' en el botón hamburguesa
        menuToggle.classList.toggle('active');
        // Alternar clase 'active' en el menú para mostrarlo/ocultarlo
        navMenu.classList.toggle('active');
    });
    
    // Cerrar el menú cuando se hace clic en un enlace
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Remover clases 'active' para cerrar el menú
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    
    // ==========================================
    // NAVBAR CON EFECTO AL HACER SCROLL
    // ==========================================
    
    const navbar = document.getElementById('navbar');
    
    // Función que se ejecuta al hacer scroll
    window.addEventListener('scroll', function() {
        // Si el scroll es mayor a 50px, agregar clase 'scrolled'
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            // Si no, remover la clase
            navbar.classList.remove('scrolled');
        }
    });
    
    
    // ==========================================
    // ANIMACIÓN DE BARRAS DE PROGRESO
    // ==========================================
    
    // Obtener todas las barras de progreso
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Función para animar las barras de progreso
    function animateProgressBars() {
        progressBars.forEach(function(bar) {
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // Verificar si el elemento es visible en la pantalla
            if (rect.top >= 0 && rect.top <= windowHeight) {
                // Si aún no se ha animado
                if (!bar.classList.contains('animate')) {
                    // Obtener el valor de progreso del atributo data-progress
                    const progress = bar.getAttribute('data-progress');
                    // Establecer el ancho directamente
                    bar.style.width = progress + '%';
                    // Agregar clase para marcar como animado
                    bar.classList.add('animate');
                }
            }
        });
    }
    
    // Ejecutar al hacer scroll
    window.addEventListener('scroll', animateProgressBars);
    
    // Ejecutar al cargar la página (por si la sección ya es visible)
    animateProgressBars();
    
    
    // ==========================================
    // BOTÓN SCROLL TO TOP (VOLVER ARRIBA)
    // ==========================================
    
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Mostrar/ocultar botón según la posición del scroll
    window.addEventListener('scroll', function() {
        // Si el scroll es mayor a 300px, mostrar el botón
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            // Si no, ocultarlo
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Función para volver arriba al hacer clic
    scrollTopBtn.addEventListener('click', function() {
        // Hacer scroll suave hacia arriba
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    // ==========================================
    // ANIMACIÓN DE APARICIÓN DE ELEMENTOS
    // ==========================================
    
    // Obtener todos los elementos que queremos animar
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .contact-btn');
    
    // Crear observador para animar elementos cuando aparecen en pantalla
    const appearObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            // Si el elemento es visible
            if (entry.isIntersecting) {
                // Agregar un pequeño delay escalonado para cada elemento
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // 100ms de delay entre cada elemento
                
                // Dejar de observar
                appearObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Activar cuando 20% sea visible
    });
    
    // Establecer estilos iniciales y observar cada elemento
    animateElements.forEach(function(element) {
        // Establecer opacidad 0 y posición inicial para la animación
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        // Observar el elemento
        appearObserver.observe(element);
    });
    
    
    // ==========================================
    // SMOOTH SCROLL PARA ENLACES DE NAVEGACIÓN
    // ==========================================
    
    // Esta funcionalidad ya está implementada con CSS (scroll-behavior: smooth)
    // pero podemos agregar un comportamiento adicional si es necesario
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Prevenir comportamiento por defecto
            e.preventDefault();
            
            // Obtener el href del enlace (ejemplo: "#sobre-mi")
            const targetId = this.getAttribute('href');
            // Buscar el elemento con ese ID
            const targetSection = document.querySelector(targetId);
            
            // Si existe la sección, hacer scroll hacia ella
            if (targetSection) {
                // Obtener la altura del navbar para ajustar la posición
                const navbarHeight = navbar.offsetHeight;
                // Calcular la posición final
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Hacer scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ==========================================
    // ANIMACIÓN DEL LOGO AL HACER CLIC
    // ==========================================
    
    const logo = document.querySelector('.logo');
    
    logo.addEventListener('click', function() {
        // Volver al inicio al hacer clic en el logo
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    // ==========================================
    // RESALTAR ENLACE ACTIVO EN LA NAVEGACIÓN
    // ==========================================
    
    // Función para actualizar el enlace activo según la sección visible
    function updateActiveLink() {
        // Obtener la posición actual del scroll
        const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
        
        // Recorrer todos los enlaces
        navLinks.forEach(function(link) {
            // Obtener el ID de la sección a la que apunta el enlace
            const sectionId = link.getAttribute('href');
            const section = document.querySelector(sectionId);
            
            if (section) {
                // Obtener posición de la sección
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                // Si estamos en esta sección, agregar clase active
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    // Remover clase active de todos los enlaces
                    navLinks.forEach(function(l) {
                        l.classList.remove('active');
                    });
                    // Agregar clase active al enlace actual
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Ejecutar al hacer scroll
    window.addEventListener('scroll', updateActiveLink);
    // Ejecutar al cargar la página
    updateActiveLink();
    
    
    // ==========================================
    // EFECTO DE ESCRITURA EN EL TÍTULO (OPCIONAL)
    // ==========================================
    
    // Esta función crea un efecto de texto escribiéndose
    // Se puede aplicar al título principal del hero
    
    function typeWriter(element, text, speed) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Descomentar las siguientes líneas si deseas usar el efecto de escritura
    // const heroTitle = document.querySelector('.hero-title');
    // const titleText = heroTitle.textContent;
    // typeWriter(heroTitle, titleText, 50);
    
    
    // ==========================================
    // PREVENIR SCROLL HORIZONTAL
    // ==========================================
    
    // Asegurar que no haya scroll horizontal accidental
    document.body.style.overflowX = 'hidden';
    
    
    // ==========================================
    // OPTIMIZACIÓN: DEBOUNCE PARA EVENTOS DE SCROLL
    // ==========================================
    
    // Función debounce para limitar la frecuencia de ejecución de funciones
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Aplicar debounce a las funciones de scroll si hay problemas de rendimiento
    // window.addEventListener('scroll', debounce(updateActiveLink, 50));
    
    
    // ==========================================
    // MENSAJE DE CONSOLA (OPCIONAL)
    // ==========================================
    
    console.log('%c¡Hola! 👋', 'color: #1dd1a1; font-size: 20px; font-weight: bold;');
    console.log('%cGracias por visitar mi portfolio', 'color: #2d3436; font-size: 14px;');
    console.log('%c- Francis Gedoz', 'color: #636e72; font-size: 12px;');
    
});


// ==========================================
// FUNCIONES GLOBALES ADICIONALES
// ==========================================

// Función para detectar si un elemento es visible en el viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para agregar clase cuando un elemento es visible
function checkVisibility(elements, className) {
    elements.forEach(function(element) {
        if (isElementInViewport(element)) {
            element.classList.add(className);
        }
    });
}