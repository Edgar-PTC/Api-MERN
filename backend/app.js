import express from 'express';
import productsRouter from './src/routers/products.js';
import faqsRouter from './src/routers/faqs.js';
import branchesRouter from './src/routers/branches.js';
import employeesRouter from './src/routers/employees.js';
import reviewsRouter from './src/routers/reviews.js'
import brandsRouter from './src/routers/brands.js'
import adminsRouter from './src/routers/admins.js'
import clientsRouter from './src/routers/clients.js'
import registerClients from "./src/routers/registerClients.js"
import registerEmployees from "./src/routers/registerEmployee.js"
import loginClient from "./src/routers/loginClients.js"
import logOut from "./src/routers/logOut.js"
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

//que acepte json desde postman
app.use(express.json());

//endpoints
app.use("/api/products", productsRouter);
app.use("/api/faqs", faqsRouter);
app.use("/api/branches", branchesRouter);
app.use("/api/employee", employeesRouter);
app.use("/api/review", reviewsRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/admins", adminsRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/registerClients", registerClients);
app.use("/api/registerEmployees", registerEmployees);
app.use("/api/loginClient", loginClient)
app.use("/api/logout", logOut)

export default app;