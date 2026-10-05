# Mueblería Hermanos Jota

Aplicación cliente-servidor de la mueblería de diseño Hermanos Jota, inspirada en la calidez de los materiales nobles, la artesanía y el diseño atemporal.

## Integrantes

- Mercado Mara (Grupo 15)

## Descripción

El proyecto permite explorar el catálogo de muebles, ver el detalle de cada pieza, agregar productos a un carrito y enviar un mensaje de contacto. El frontend está desarrollado en React y obtiene los productos desde una API propia construida con Node.js y Express.

## Arquitectura

```text
/
├── backend/     # API REST con Node.js y Express
├── client/      # Aplicación React (Create React App)
├── README.md
└── .gitignore
```

Durante el desarrollo, React corre en el puerto 3000 y Express en el puerto 3001.

El archivo `client/package.json` incluye `"proxy": "http://localhost:3001"`. Gracias a ese proxy, el frontend puede hacer:

```js
fetch("/api/productos")
```

Create React App reenvía esas peticiones al backend. No se utiliza una librería extra de CORS.

Flujo:

React → `fetch("/api/productos")` → Express → `backend/data/productos.js`

## Backend

El backend está en `/backend` y se inicia con `npm start`.

Tecnologías y piezas implementadas:

- **Node.js** y **Express**.
- **express.Router** en `backend/routes/productos.js`, montado desde `server.js` en `/api/productos`.
- **Middleware de logging** global en `backend/middleware/logger.js`. Registra el método HTTP y la URL, por ejemplo `GET /api/productos`.
- **express.json()** configurado en `server.js` para futuras peticiones con cuerpo JSON.
- **Manejador 404** en `backend/middleware/notFound.js` para rutas que no existen.
- **Manejador centralizado de errores** en `backend/middleware/errorHandler.js`, con firma `(err, req, res, next)`.
- **Archivo local de productos** en `backend/data/productos.js` (JavaScript, no JSON ni base de datos). Exporta un array de 11 productos.

## API

### GET /api/productos

Devuelve el listado completo de productos en formato JSON y HTTP 200.

### GET /api/productos/:id

Busca el producto cuyo `id` coincide con el parámetro.

- Si existe: HTTP 200 y el producto en JSON.
- Si no existe: HTTP 404 y un JSON con el mensaje `Producto no encontrado`.

### Rutas inexistentes

Por ejemplo `GET /api/lo-que-sea` responde HTTP 404 con un JSON indicando que la ruta no fue encontrada.

## Frontend

El frontend está en `/client` y se creó con **Create React App**.

- **React** con JavaScript.
- **App.js** es el componente principal. Ahí vive el estado del carrito con `useState` y se pasa la información por **props**.
- **Navbar** muestra el contador del carrito recibido por props.
- **Footer** reutiliza la información y el diseño del pie original.
- **ProductList** recibe los productos por props y los recorre con `.map()` para renderizar **ProductCard**.
- **ProductCard** muestra la información principal, permite ver el detalle y agregar al carrito.
- **ProductDetail** muestra el detalle del producto seleccionado mediante **renderizado condicional** (sin React Router).
- **ContactForm** es un formulario controlado con `useState`, `onChange` y `onSubmit`.
- Los productos se obtienen con **fetch** desde `/api/productos`. No hay un array local de productos en el frontend.
- Se manejan estados de **carga**, **éxito** y **error**.
- El carrito se administra en `App.js`. El contador se actualiza al agregar productos.
- Se conserva la búsqueda por nombre o categoría del proyecto anterior.

## Instalación

Terminal 1:

```bash
cd backend
npm install
```

Terminal 2:

```bash
cd client
npm install
```

## Ejecución

Hay que tener los dos servidores en ejecución.

Terminal 1:

```bash
cd backend
npm start
```

El backend queda en `http://localhost:3001`.

Terminal 2:

```bash
cd client
npm start
```

El frontend queda en `http://localhost:3000`.

Los precios del catálogo son demostrativos.
