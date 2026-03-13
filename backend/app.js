import express from 'express';
import productsRouter from './src/routers/products.js';
import faqsRouter from './src/routers/faqs.js';
import branchesRouter from './src/routers/branches.js';

const app = express();

//que acepte json desde postman
app.use(express.json());

//endpoints
app.use("/api/products", productsRouter);
app.use("/api/faqs", faqsRouter);
app.use("/api/branches", branchesRouter);

export default app;