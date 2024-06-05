import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// For DB seeding -->
import { kpis, products, transactions } from "./data/data.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js"
import Transaction from "./models/Transaction.js"

import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js"


// Configuration -->
dotenv.config();
const app = express();
app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (as sent by HTML forms)
app.use(helmet()); // Secure your Express apps by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Set Cross-Origin Resource Policy to "cross-origin"
app.use(morgan("common")); // HTTP request logger middleware
app.use(cors()); // Enable All CORS Requests
 
// Routes -->
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes)

// MongoDB
const PORT = process.env.PORT || 9000;
mongoose
	.connect(process.env.MONGO_URL, {})
	.then(async () => {
		app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

		// Seed our data base only when needed -->
		// await mongoose.connection.db.dropDatabase();
		// KPI.insertMany(kpis);
		// Product.insertMany(products);
		// Transaction.insertMany(transactions);
	})
	.catch((error) => console.log(`Did not connect ❌ \n ${error}`));

console.log("Hello");
