import 'dotenv/config'
import mongoose from "mongoose";
import {createClient} from 'redis'
import app from "./app";
import { mqttClient, publishMassive, publishMqttMessage, subscribeMqttTopic } from './mqtt';
import clc from 'cli-color';

export const redisClient = createClient({
  url: "redis://redis-srv:6379"
})


const start = async () => {

    try {
        

      mqttClient.on('connect', () => {
        console.log('Connected to MQTT broker');
      });    
    
    mqttClient.on('error', (error) => {
        console.error('Error:', error);
    });
      
    
      mqttClient.on('message', (receivedTopic: string, message: Buffer) => {
      
      console.log(clc.blue(`Received message from topic '${receivedTopic}': ${message.toString()}`))
      
      });
      
      await subscribeMqttTopic('test-topic')

      await publishMassive('test-topic',5000)      

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
