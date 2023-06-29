import 'dotenv/config'
import mongoose from "mongoose";

import  app from "./app";
import { TaskCreatedListner } from './event/listener/task.created.listener';
import { kafka_client } from './kafka.wrapper';
import { TaskDeletedListner } from './event/listener/task.deleted.listener';

const start = async () => {


    if (!process.env.JWT_KEY) {
      
        throw new Error("JWT_KEY must be defined");
        
    }


    if (!process.env.MONGO_URI) {
      
        throw new Error("MONGO_URI must be defined"); 
        
    }
    

    try {
      
        await mongoose.connect('mongodb://mongo-srv:27017/user');
        
        console.log("Connected to MongoDb");

        await new TaskCreatedListner(kafka_client).listen()

        await new TaskDeletedListner(kafka_client).listen()
        
    } catch (err) {
        
        console.error(err);
        
  }

    app.listen(3000, () => {
      
        console.log("Listening on port 3000!!!!!!!!");
        
    });
    
};

start();
