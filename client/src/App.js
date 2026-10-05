import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import { useEffect, useState } from "react";

const IDS_DESTACADOS = [
    "sofa-patagonia",
    "mesa-de-centro-araucaria",
    "butaca-mendoza",
    "aparador-uspallata"
];

function formatearPrecio(precio) {
    return `$ ${precio.toLocaleString("es-AR")}`;
}

function App() {
    const [productos, setProductos] = useState([]);
    const [estadoCarga, setEstadoCarga] = useState("carga");
    const [mensajeError, setMensajeError] = useState("");
    const [carrito, setCarrito] = useState([]);
    const [vista, setVista] = useState("inicio");
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [carritoAbierto, setCarritoAbierto] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("carrito-abierto", carritoAbierto);

        return () => {
            document.body.classList.remove("carrito-abierto");
        };
    }, [carritoAbierto]);

    useEffect(() => {
        let cancelado = false;

        async function obtenerProductos() {
            try {
                const respuesta = await fetch("/api/productos");

                if (!respuesta.ok) {
                    throw new Error("Respuesta no válida del servidor");
                }

                const datos = await respuesta.json();

                if (!cancelado) {
                    setProductos(datos);
                    setEstadoCarga("exito");
                }
            } catch (error) {
                if (!cancelado) {
                    setEstadoCarga("error");
                    setMensajeError("No pudimos cargar el catálogo. Comprobá que el servidor backend esté en ejecución.");
                }
            }
        }

        obtenerProductos();

        return () => {
            cancelado = true;
        };
    }, []);

    function agregarAlCarrito(producto) {
        setCarrito((carritoActual) => [...carritoActual, producto]);
    }

    function quitarUnaUnidad(idProducto) {
        setCarrito((carritoActual) => {
            const posicion = carritoActual.findIndex((item) => item.id === idProducto);

            if (posicion === -1) {
                return carritoActual;
            }

            return carritoActual.filter((_, indice) => indice !== posicion);
        });
    }

    function eliminarProducto(idProducto) {
        setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== idProducto));
    }

    function verProducto(producto) {
        setProductoSeleccionado(producto);
        setVista("detalle");
        window.scrollTo(0, 0);
    }

    function irAVista(nuevaVista) {
        setVista(nuevaVista);
        if (nuevaVista !== "detalle") {
            setProductoSeleccionado(null);
        }
        if (nuevaVista !== "catalogo") {
            setTextoBusqueda("");
        }
        window.scrollTo(0, 0);
    }

    function volverAlCatalogo() {
        setProductoSeleccionado(null);
        setVista("catalogo");
        window.scrollTo(0, 0);
    }

    const productosDestacados = productos.filter((producto) => IDS_DESTACADOS.includes(producto.id));

    const productosFiltrados = productos.filter((producto) => {
        const consulta = textoBusqueda.trim().toLowerCase();

        if (consulta === "") {
            return true;
        }

        return (
            producto.nombre.toLowerCase().includes(consulta) ||
            producto.categoria.toLowerCase().includes(consulta)
        );
    });

    const gruposCarrito = carrito.reduce((grupos, producto) => {
        const grupo = grupos.find((item) => item.producto.id === producto.id);

        if (grupo) {
            grupo.cantidad += 1;
        } else {
            grupos.push({ producto, cantidad: 1 });
        }

        return grupos;
    }, []);

    function renderizarContenido() {
        if (vista === "contacto") {
            return <ContactForm />;
        }

        if (estadoCarga === "carga") {
            return <p className="estado-carga contenedor">Cargando productos...</p>;
        }

        if (estadoCarga === "error") {
            return <p className="estado-error contenedor">{mensajeError}</p>;
        }

        if (vista === "detalle" && productoSeleccionado) {
            return (
                <ProductDetail
                    producto={productoSeleccionado}
                    onVolver={volverAlCatalogo}
                    onAgregarAlCarrito={agregarAlCarrito}
                />
            );
        }

        if (vista === "catalogo") {
            const hayBusqueda = textoBusqueda.trim() !== "";
            let textoResultado = "";

            if (hayBusqueda && productosFiltrados.length === 0) {
                textoResultado = "Sin coincidencias";
            } else if (hayBusqueda && productosFiltrados.length === 1) {
                textoResultado = "1 producto encontrado";
            } else if (hayBusqueda) {
                textoResultado = `${productosFiltrados.length} productos encontrados`;
            }

            return (
                <section className="catalogo" aria-labelledby="titulo-catalogo">
                    <div className="contenedor">
                        <p className="eyebrow">Piezas para habitar mejor</p>
                        <h1 id="titulo-catalogo">Catálogo</h1>
                        <p className="seccion-introduccion">
                            Muebles pensados para quedarse: materiales nobles, formas atemporales y el calor de un oficio que se transmite de generación en generación.
                        </p>

                        <form className="buscador" role="search" onSubmit={(evento) => evento.preventDefault()}>
                            <label htmlFor="buscar-producto">Buscar por nombre o categoría</label>
                            <input
                                id="buscar-producto"
                                type="search"
                                name="q"
                                placeholder="Ejemplo: sofá, mesas, living"
                                autoComplete="off"
                                value={textoBusqueda}
                                onChange={(evento) => setTextoBusqueda(evento.target.value)}
                            />
                            <p id="resultado-busqueda" aria-live="polite">{textoResultado}</p>
                        </form>

                        <ProductList
                            productos={productosFiltrados}
                            onVerProducto={verProducto}
                            onAgregarAlCarrito={agregarAlCarrito}
                        />
                    </div>
                </section>
            );
        }

        return (
            <>
                <section
                    className="hero"
                    aria-labelledby="titulo-principal"
                    style={{
                        backgroundImage: `linear-gradient(90deg, rgba(245, 230, 211, 0.98) 0%, rgba(245, 230, 211, 0.80) 54%, rgba(245, 230, 211, 0.18) 100%), url("${process.env.PUBLIC_URL}/Kit-de-imágenes-HJota/Sofá Patagonia.png")`
                    }}
                >
                    <div className="contenedor hero-contenido">
                        <p className="eyebrow">Diseño hecho para vivir mejor</p>
                        <h1 id="titulo-principal">Muebles para hogares que cuentan historias</h1>
                        <p className="hero-descripcion">
                            Piezas funcionales, cálidas y atemporales, creadas para acompañar la vida diaria con estilo y autenticidad.
                        </p>
                        <div className="hero-acciones">
                            <button className="boton boton-principal" type="button" onClick={() => irAVista("catalogo")}>
                                Explorar catálogo
                            </button>
                            <button className="boton boton-secundario" type="button" onClick={() => irAVista("contacto")}>
                                Solicitar presupuesto
                            </button>
                        </div>
                    </div>
                </section>

                <section className="destacados" aria-labelledby="titulo-destacados">
                    <div className="contenedor">
                        <p className="eyebrow">Una selección para empezar</p>
                        <h2 id="titulo-destacados">Piezas destacadas</h2>
                        <p className="seccion-introduccion">Objetos honestos, materiales nobles y detalles pensados para quedarse.</p>

                        <ProductList
                            productos={productosDestacados}
                            onVerProducto={verProducto}
                            onAgregarAlCarrito={agregarAlCarrito}
                            className="productos-destacados"
                        />

                        <button className="enlace-catalogo" type="button" onClick={() => irAVista("catalogo")}>
                            Ver todo el catálogo
                        </button>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <Navbar
                contadorCarrito={carrito.length}
                vistaActual={vista}
                onNavegar={irAVista}
                onAbrirCarrito={() => setCarritoAbierto(true)}
            />

            <main>{renderizarContenido()}</main>

            <Footer />

            <div className="fondo-carrito" onClick={() => setCarritoAbierto(false)}></div>
            <aside className="panel-carrito" id="panel-carrito" aria-labelledby="titulo-carrito" aria-hidden={!carritoAbierto}>
                <div className="panel-carrito-encabezado">
                    <div>
                        <p className="eyebrow">Tu selección</p>
                        <h2 id="titulo-carrito">Carrito</h2>
                    </div>
                    <button className="cerrar-carrito" type="button" aria-label="Cerrar carrito" onClick={() => setCarritoAbierto(false)}>
                        &times;
                    </button>
                </div>
                {gruposCarrito.length === 0 ? (
                    <p className="carrito-vacio">Su carrito está vacío.</p>
                ) : (
                    <div className="lista-carrito">
                        {gruposCarrito.map((grupo) => (
                            <article className="carrito-linea" key={grupo.producto.id}>
                                <img src={`${process.env.PUBLIC_URL}${grupo.producto.imagen}`} alt="" />
                                <div className="carrito-linea-contenido">
                                    <h3>{grupo.producto.nombre}</h3>
                                    <p>{formatearPrecio(grupo.producto.precio)} · Cantidad: {grupo.cantidad}</p>
                                    <div className="carrito-linea-acciones">
                                        <button className="carrito-quitar" type="button" onClick={() => quitarUnaUnidad(grupo.producto.id)}>
                                            Quitar una unidad
                                        </button>
                                        <button className="carrito-quitar carrito-quitar-todo" type="button" onClick={() => eliminarProducto(grupo.producto.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </aside>
        </>
    );
}

export default App;
