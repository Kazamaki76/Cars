import express from "express";
import { PORT ,mongoURL} from "./config.js";
import mongoose from "mongoose";


const app = express();

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Hello World");
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err);
    })