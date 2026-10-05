function Navbar({ contadorCarrito, vistaActual, onNavegar, onAbrirCarrito }) {
    return (
        <header>
            <div className="contenedor-encabezado">
                <button className="marca" type="button" onClick={() => onNavegar("inicio")} aria-label="Hermanos Jota, inicio">
                    <span className="marca-logo">
                        <img src={`${process.env.PUBLIC_URL}/Kit-de-imágenes-HJota/logo.svg`} alt="Logo de Hermanos Jota" width="120" height="120" />
                    </span>
                    <span>Hermanos Jota</span>
                </button>
                <nav aria-label="Navegación principal">
                    <ul>
                        <li>
                            <button
                                className="nav-enlace"
                                type="button"
                                aria-current={vistaActual === "inicio" ? "page" : undefined}
                                onClick={() => onNavegar("inicio")}
                            >
                                Inicio
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-enlace"
                                type="button"
                                aria-current={vistaActual === "catalogo" || vistaActual === "detalle" ? "page" : undefined}
                                onClick={() => onNavegar("catalogo")}
                            >
                                Catálogo
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-enlace"
                                type="button"
                                aria-current={vistaActual === "contacto" ? "page" : undefined}
                                onClick={() => onNavegar("contacto")}
                            >
                                Contacto
                            </button>
                        </li>
                        <li>
                            <button className="carrito-indicador" type="button" onClick={onAbrirCarrito} aria-controls="panel-carrito">
                                Carrito (<span>{contadorCarrito}</span>)
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
