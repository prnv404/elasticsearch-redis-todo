import 'dotenv/config'
import mongoose from "mongoose";
import {createClient} from 'redis'
import app from "./app";

export const redisClient = createClient({
    url:"redis://redis-service:6379",
})


const start = async () => {

    try {
  
        await mongoose.connect('mongodb://mongo-srv:27017/task');
        
        console.log("Connected to MongoDb");

        await redisClient.connect()
        
        redisClient.on('error', (error) => {
            console.error('Redis connection error:', error);
        });
        
          
        
    } catch (err) {
        
        console.error(err);
        
  }

    app.listen(3000, () => {
      
        console.log("Listening on port 3000!!!!!!!!");
        
    });
    
};

start()
