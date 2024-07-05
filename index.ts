import express from 'express';
import cors from 'cors';
import CategoryRoutes from './src/routes/CategoryRoutes.js'
import OrderItemsRoutes from './src/routes/OrderItemsRoutes.js'
import OrderRoutes from './src/routes/OrdersRoutes.js'
import PaymentMethodRoutes from './src/routes/PaymentMethodRoutes.js'
import ProductionRoutes from './src/routes/ProductionRoutes.js'
import ProductRoutes from './src/routes/ProductRoutes.js'
import RestrictionProductRoutes from './src/routes/RestrictionProductRoutes.js'
import MainRoutes from './src/routes/MainRoutes.js'

const app = express();

app.use(express.json());

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());

app.use(cors({
    origin: allowedOrigins
}));

app.use("/", MainRoutes);
app.use("/category", CategoryRoutes);
app.use("/orderItems", OrderItemsRoutes);
app.use("/orders", OrderRoutes);
app.use("/paymentMethod", PaymentMethodRoutes);
app.use("/production", ProductionRoutes);
app.use("/products", ProductRoutes);
app.use("/restrictionProduct", RestrictionProductRoutes)

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

export default app;