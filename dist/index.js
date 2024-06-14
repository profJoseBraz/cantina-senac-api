import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
const allowedOrigins = ["http://localhost:5173"];
app.use(express.json());
app.use(cors({
    origin: allowedOrigins
}));
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
export default app;
