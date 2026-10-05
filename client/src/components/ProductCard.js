function ProductCard({ producto, onVerProducto, onAgregarAlCarrito }) {
    return (
        <article className="producto-card">
            <button className="producto-imagen" type="button" onClick={() => onVerProducto(producto)}>
                <img src={`${process.env.PUBLIC_URL}${producto.imagen}`} alt={`${producto.nombre} de Hermanos Jota`} />
            </button>
            <div className="producto-contenido">
                <p className="producto-categoria">{producto.categoria}</p>
                <h3>
                    <button className="producto-titulo" type="button" onClick={() => onVerProducto(producto)}>
                        {producto.nombre}
                    </button>
                </h3>
                <p>{producto.descripcion}</p>
                <p className="producto-precio">$ {producto.precio.toLocaleString("es-AR")}</p>
                <div className="producto-acciones">
                    <button className="producto-enlace" type="button" onClick={() => onVerProducto(producto)}>
                        Ver pieza
                    </button>
                    <button className="boton boton-principal boton-card" type="button" onClick={() => onAgregarAlCarrito(producto)}>
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;
