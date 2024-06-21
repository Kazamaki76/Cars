import express from "express";
import mongoose, { connect } from "mongoose";
import carsRoutes from "./routes/carsRoutes.js";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv();
const PORT = process.env.PORT || 5555;
const mongoURL = process.env.MONGO_URL;
console.log( PORT, mongoURL);

const app = express();
app.use (express.json());

app.use(cors())

app.get("/", (request, res) => {
    console.log(request);
    return res.status(234).send("Hello World");
})

app.use("/cars",carsRoutes)

mongoose
.connect(mongoURL)
    .then(() => {
        console.log("Database Connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })