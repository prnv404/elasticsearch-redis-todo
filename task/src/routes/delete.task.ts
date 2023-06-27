import express, { Request, Response } from "express";
import { currentUser, requireAuth, validateRequest } from "@prnv404/todo";
import { Task } from "../models/task.model";

const router = express.Router();

router.delete("/", currentUser, validateRequest, async (req: Request, res: Response) => {

     
    const userId = req.currentUser?.id

    
    const taskid = req.params.id


    const deleteTask = await Task.findOne({ userId, _id: taskid })

    if (!deleteTask) {

      return res.status(404).json({ message: "Task not found" });

    }
    

    res.status(202).send(deleteTask);
    
      
});




export { router as DeleteTaskRequest }
