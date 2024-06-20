import express from 'express';
import cors from 'cors';
import CategoryRoutes from './src/routes/CategoryRoutes.js'
import OrderItemsRoutes from './src/routes/OrderItemsRoutes.js'
import OrderRoutes from './src/routes/OrdersRoutes.js'

const app = express();

app.use(express.json());

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());

app.use(cors({
    origin: allowedOrigins
}));

app.use("/category", CategoryRoutes);
app.use("/order_items", OrderItemsRoutes);
app.use("/orders", OrderRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

export default app;