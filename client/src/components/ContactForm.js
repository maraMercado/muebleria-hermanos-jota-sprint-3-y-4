import { useState } from "react";

function ContactForm() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [errorNombre, setErrorNombre] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorMensaje, setErrorMensaje] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");

    function validarEmail(valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }

    function handleSubmit(evento) {
        evento.preventDefault();

        setErrorNombre("");
        setErrorEmail("");
        setErrorMensaje("");
        setMensajeExito("");

        let esValido = true;

        if (nombre.trim().length < 2) {
            setErrorNombre("Ingresá tu nombre completo.");
            esValido = false;
        }

        if (!validarEmail(email.trim())) {
            setErrorEmail("Ingresá un email válido.");
            esValido = false;
        }

        if (mensaje.trim().length < 10) {
            setErrorMensaje("Contanos un poco más (mínimo 10 caracteres).");
            esValido = false;
        }

        if (!esValido) {
            return;
        }

        setMensajeExito(`¡Gracias, ${nombre.trim()}! Recibimos tu mensaje y te vamos a responder a la brevedad.`);
        setNombre("");
        setEmail("");
        setMensaje("");
    }

    return (
        <form className="formulario-contacto" onSubmit={handleSubmit} noValidate>
            <h1>Contacto</h1>
            <p>¿Tenés dudas sobre una pieza o querés pedir un presupuesto a medida? Escribinos y te respondemos a la brevedad.</p>

            <label htmlFor="nombre">Nombre</label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                autoComplete="name"
                required
                value={nombre}
                onChange={(evento) => setNombre(evento.target.value)}
            />
            <p role="alert">{errorNombre}</p>

            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
            />
            <p role="alert">{errorEmail}</p>

            <label htmlFor="mensaje">Mensaje</label>
            <textarea
                id="mensaje"
                name="mensaje"
                required
                value={mensaje}
                onChange={(evento) => setMensaje(evento.target.value)}
            />
            <p role="alert">{errorMensaje}</p>

            <button type="submit">Enviar mensaje</button>

            {mensajeExito ? (
                <p id="mensaje-exito" role="status" aria-live="polite">{mensajeExito}</p>
            ) : null}

            <p>
                <strong>Showroom:</strong> Av. San Juan 2847, San Cristóbal, CABA ·
                Lun a Vie 10:00–19:00, Sáb 10:00–14:00 · WhatsApp +54 11 4567-8900
            </p>
        </form>
    );
}

export default ContactForm;
