import express from 'express';
import cors from 'cors';
import categoryRoutes from './src/routes/CategoryRoutes.js';
import orderItemsRoutes from './src/routes/OrderItems.js';
const app = express();
app.use(express.json());
const allowedOrigins = ["http://localhost:5173"];
app.use(express.json());
app.use(cors({
    origin: allowedOrigins
}));
app.use("/category", categoryRoutes);
app.use("/order_items", orderItemsRoutes);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
export default app;
