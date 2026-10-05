import { useState } from "react";

function ProductDetail({ producto, onVolver, onAgregarAlCarrito }) {
    const [mensaje, setMensaje] = useState("");

    function agregar() {
        onAgregarAlCarrito(producto);
        setMensaje("La pieza se añadió al carrito.");
    }

    const caracteristicas = Object.entries(producto.caracteristicas);

    return (
        <article className="detalle-producto contenedor">
            <button className="volver-catalogo" type="button" onClick={onVolver}>
                &larr; Volver al catálogo
            </button>
            <div className="detalle-grid">
                <div className="detalle-imagen-contenedor">
                    <img src={`${process.env.PUBLIC_URL}${producto.imagen}`} alt={`${producto.nombre} de Hermanos Jota`} />
                </div>
                <div className="detalle-informacion">
                    <p className="producto-categoria">{producto.categoria}</p>
                    <h1>{producto.nombre}</h1>
                    <p className="descripcion">{producto.descripcion}</p>
                    <p className="detalle-precio">$ {producto.precio.toLocaleString("es-AR")}</p>
                    <button type="button" onClick={agregar}>Añadir al carrito</button>
                    <p className="mensaje-carrito" role="status" aria-live="polite">{mensaje}</p>
                </div>
            </div>

            <section className="detalle-caracteristicas" aria-labelledby="titulo-caracteristicas">
                <p className="eyebrow">Hecho para quedarse</p>
                <h2 id="titulo-caracteristicas">Detalles de fabricación</h2>
                <table>
                    <tbody>
                        {caracteristicas.map(([nombre, valor]) => (
                            <tr key={nombre}>
                                <th scope="row">{nombre.charAt(0).toUpperCase() + nombre.slice(1)}</th>
                                <td>{valor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </article>
    );
}

export default ProductDetail;
