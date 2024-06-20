import express from "express";
import { PORT ,mongoURL} from "./config.js";
import mongoose from "mongoose";
import { Car } from "./models/carModel.js";

const app = express();
app.use (express.json());
app.get("/", (request, res) => {
    console.log(request);
    return res.status(234).send("Hello World");
})

app.get("/cars", async (request, response) => {
    try{
        const cars = await Car.find({});
        return response.status(200).json(
            {
                count : cars.length,
                data: cars
            });
    }catch(err){
        console.log(err.message);
        response.status(500).send({ message : err.message});
    }
})

app.get("/cars/:id", async (request, response) => {
    try{
        const {id}= request.params;
        const cars = await Car.findById(id);
        return response.status(200).json(cars);
    }catch(err){
        console.log(err.message);
        response.status(500).send({ message : err.message});
    }
})

app.post("/cars", async (request, response) => {
    try{
        if(
            !request.body.licensePlate||
            !request.body.brand||
            !request.body.model||
            !request.body.remarks||
            !request.body.etc
        ){
            return response.status(400).send({ message: `All fields are required`});
        }
        const newCar ={
            licensePlate : request.body.licensePlate,
            brand : request.body.brand,
            model : request.body.model,
            remarks : request.body.remarks,
            etc : request.body.etc
        }
        const car = await Car.create(newCar);

        return response.status(201).send(car);
    }catch(err){
        console.log(err);}
})

app.put("/cars/:id", async (request, response) => {
    try{
        if(
            !request.body.licensePlate||
            !request.body.brand||
            !request.body.model||
            !request.body.remarks||
            !request.body.etc
        ){
            return response.status(400).send({ message: `All fields are required`});
        }
        const {id}= request.params;
        const result = await Car.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).send({ message: `Car not found`});
        }
        return response.status(200).send({ message: `Car updated successfully`});
    }catch(err){
        console.log(err.message);
        response.status(500).send({ message : err.message});
    }
})

app.delete("/cars/:id", async (request, response) => {
    try{
        const {id}= request.params;
        const result = await Car.findByIdAndDelete(id);
        if(!result){
            return response.status(404).send({ message: `Car not found`});
        }
        return response.status(200).send({ message: `Car deleted successfully`});
    }catch(err){
        console.log(err.message);
        response.status(500).send({ message : err.message});
    }
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