// Menú adaptable para pantallas pequeñas.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector(".theme-toggle-icon");
const themeText = document.querySelector(".theme-toggle-text");

function closeMenu() {
	menuToggle.setAttribute("aria-expanded", "false");
	menuToggle.setAttribute("aria-label", "Abrir menú de navegación");
	navLinks.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
	const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
	menuToggle.setAttribute("aria-expanded", String(!isExpanded));
	menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menú de navegación" : "Cerrar menú de navegación");
	navLinks.classList.toggle("is-open", !isExpanded);
});

navLinks.addEventListener("click", (event) => {
	if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") closeMenu();
});

function applyTheme(theme) {
	document.documentElement.setAttribute("data-theme", theme);
	const isDark = theme === "dark";
	themeToggle.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
	themeToggle.setAttribute("aria-pressed", String(isDark));
	themeIcon.textContent = isDark ? "🌙" : "☀️";
	themeText.textContent = isDark ? "Oscuro" : "Claro";
	localStorage.setItem("portfolio-theme", theme);
}

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
	const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
	applyTheme(nextTheme);
});

// Entrada suave de los elementos al llegar a la pantalla.
const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	revealElements.forEach((element) => revealObserver.observe(element));
} else {
	revealElements.forEach((element) => element.classList.add("is-visible"));
}

// El formulario prepara el mensaje en la aplicación de correo del visitante.
const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

contactForm.addEventListener("submit", (event) => {
	event.preventDefault();

	if (!contactForm.reportValidity()) return;

	const formData = new FormData(contactForm);
	const senderName = formData.get("name").trim();
	const senderEmail = formData.get("email").trim();
	const message = formData.get("message").trim();
	const subject = encodeURIComponent(`Contacto desde el portafolio: ${senderName}`);
	const body = encodeURIComponent(`${message}\n\nDe: ${senderName}\nCorreo: ${senderEmail}`);

	formNote.textContent = "Se abrirá tu aplicación de correo. Añade el correo de Pepe como destinatario para enviar el mensaje.";
	window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

// Año actualizado automáticamente en el pie de página.
document.querySelector("#current-year").textContent = new Date().getFullYear();
