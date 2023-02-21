import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { corsOptions } from "./config/cors.js";
import authRoutes from "./routes/authRoutes.js"
import twilioService from "./utils/twilio.js"
dotenv.config();

const app = express();

app.use(cors(corsOptions))
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// database connection
connectDB()
twilioService()


app.use("/user", authRoutes)




    // server running on corresponding port
app.listen(process.env.PORT,()=>console.log(`server listening on ${process.env.PORT}`))