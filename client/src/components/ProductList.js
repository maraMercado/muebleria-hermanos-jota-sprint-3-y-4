import ProductCard from "./ProductCard";

function ProductList({ productos, onVerProducto, onAgregarAlCarrito, className }) {
    if (productos.length === 0) {
        return <p className="sin-resultados">No encontramos productos que coincidan con tu búsqueda.</p>;
    }

    return (
        <div className={className || "productos-lista"}>
            {productos.map((producto) => (
                <ProductCard
                    key={producto.id}
                    producto={producto}
                    onVerProducto={onVerProducto}
                    onAgregarAlCarrito={onAgregarAlCarrito}
                />
            ))}
        </div>
    );
}

export default ProductList;
