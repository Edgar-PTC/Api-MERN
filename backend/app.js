import express from 'express';
import productsRouter from './src/routers/products.js';
import faqsRouter from './src/routers/faqs.js';
import branchesRouter from './src/routers/branches.js';
import employeesRouter from './src/routers/employees.js';
import reviewsRouter from './src/routers/reviews.js'
import brandsRouter from './src/routers/brands.js'

const app = express();

//que acepte json desde postman
app.use(express.json());

//endpoints
app.use("/api/products", productsRouter);
app.use("/api/faqs", faqsRouter);
app.use("/api/branches", branchesRouter);
app.use("/api/employee", employeesRouter);
app.use("/api/review", reviewsRouter);
app.use("/api/brands", brandsRouter);

export default app;