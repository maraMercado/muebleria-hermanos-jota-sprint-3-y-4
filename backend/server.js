const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const productosRouter = require("./routes/productos");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(logger);

app.use(express.static(path.join(__dirname, "../client/public")));

app.use("/api/productos", productosRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor backend en http://localhost:${PORT}`);
});
