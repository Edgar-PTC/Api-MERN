import express from 'express';
import productsRouter from './src/routers/products.js';
import faqsRouter from './src/routers/faqs.js';
import branchesRouter from './src/routers/branches.js';
import employeesRouter from './src/routers/employees.js';
import reviewsRouter from './src/routers/reviews.js'
import brandsRouter from './src/routers/brands.js'
import adminsRouter from './src/routers/admins.js'
import clientsRouter from './src/routers/clients.js'
import registerAdmins from "./src/routers/registerAdmins.js"
import registerClients from "./src/routers/registerClients.js"
import registerEmployees from "./src/routers/registerEmployee.js"
import loginClient from "./src/routers/loginClients.js"
import logOut from "./src/routers/logOut.js"
import loginAdmin from "./src/routers/loginAdmin.js"
import recoveryPassword from './src/routers/recoveryPassword.js';
import providersRouter from './src/routers/providers.js';
import wompiRouter from './src/routers/wompi.js'
import cartRouter from './src/routers/cart.js';
import deliveryDriverRoute from "./src/routers/deliveryDrivers.js"
import cookieParser from 'cookie-parser';
import cors from "cors"
import limiter from './src/middlewares/rateLimiter.js';
import { validateAuthCookie } from './src/middlewares/authMiddleware.js';

const app = express();

app.use(limiter);

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
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
app.use("/api/registerAdmins", registerAdmins);
app.use("/api/registerEmployees", registerEmployees);
app.use("/api/loginClient", loginClient)
app.use("/api/loginAdmin", loginAdmin)
app.use("/api/logout", logOut);
app.use("/api/recoveryPassword", recoveryPassword)
app.use("/api/providers", providersRouter)
app.use("/api/carts", validateAuthCookie(["customer"]), cartRouter);
app.use("/api/drivers", deliveryDriverRoute);
app.use("/api/wompi", wompiRouter);

export default app;