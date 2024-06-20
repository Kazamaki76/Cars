import express from "express";
import { PORT ,mongoURL} from "./config.js";
import mongoose from "mongoose";
import carsRoutes from "./routes/carsRoutes.js";

const app = express();
app.use (express.json());
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