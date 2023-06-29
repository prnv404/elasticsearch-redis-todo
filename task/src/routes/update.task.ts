import express, { Request, Response } from "express";
import { currentUser, requireAuth, validateRequest } from "@prnv404/todo";
import { Task } from "../models/task.model";
import { TaskUpdateEventPublisher } from "../event/publisher/task.update.publisher";
import { kafka_client } from "../kafka.wrapper";

const router = express.Router();

router.patch( "/", currentUser,validateRequest, async (req: Request, res: Response) => {
     
    const { title, description, id } = req.body;


    let task = await Task.findOneAndUpdate({ userId: req.currentUser?.id, _id:id }, {
        title,
        description
    }, { new: true })

    

    if (!task) return res.status(404).json({ message: "Task not found" })

    await task.save()


    
    await new TaskUpdateEventPublisher(kafka_client).publish({ title, description })
    

    res.status(200).send(task);
      
});

export { router as UpdateTaskRequest };
