import express, { Request, Response } from "express";
import {  NotFoundError, currentUser, requireAuth, validateRequest } from "@prnv404/todo";
import { Task } from "../models/task.model";
import { redisClient } from "../server";

    

const router = express.Router();

router.get("/all", currentUser,requireAuth, validateRequest, async (req: Request, res: Response) => {
     
    let task = await Task.find({userId:req.currentUser?.id!})

    if (!task) throw new NotFoundError()
    
    res.status(200).send(task);
})

router.get( "/:id", currentUser,requireAuth,validateRequest, async (req: Request, res: Response) => {
    
    try {
        
        const id = req.params.id

        const isInCache = await redisClient.get(id)

        console.log(isInCache)

        if (isInCache) return res.status(200).json(JSON.parse(isInCache));
        

        let task = await Task.findById(id)
        

        if (!task) throw new NotFoundError()
        

        await  redisClient.set(id, JSON.stringify(task), {
            EX: 10,
            NX: true
        });
    
        res.status(200).send(task);
        

    } catch (error) {

        console.log(error)

    }

    
      
});




    
export { router as  QueryTaskRequest}
