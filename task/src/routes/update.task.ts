import express, { Request, Response } from "express";
import { currentUser, requireAuth, validateRequest } from "@prnv404/todo";
import { Task } from "../models/task.model";

const router = express.Router();

router.patch( "/", currentUser,validateRequest, async (req: Request, res: Response) => {
     
    const { title, description, id } = req.body;

    console.log(req.body)

    let task = await Task.findById(id)

    if (!task) return res.status(404).json({ message: "Task not found" })
    
    task.title = title
    
    task.description = description

    await task.save()
    
    res.status(200).send(task);
      
});

export { router as UpdateTaskRequest };
