import express from "express";
import {Car} from "../models/carModel.js";

const router = express.Router();

//find all
router.get("/", async (request, response) => {
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

//find by id
router.get("/:id", async (request, response) => {
    try{
        const {id}= request.params;
        const cars = await Car.findById(id);
        return response.status(200).json(cars);
    }catch(err){
        console.log(err.message);
        response.status(500).send({ message : err.message});
    }
})

//create

router.post("/", async (request, response) => {
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

//update
router.put("/:id", async (request, response) => {
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

//delete
router.delete("/:id", async (request, response) => {
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

export default router