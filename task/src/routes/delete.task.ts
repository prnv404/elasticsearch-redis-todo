import express, { Request, Response } from "express";
import { NotFoundError, currentUser, requireAuth, validateRequest } from "@prnv404/todo";
import { Task } from "../models/task.model";
import { TaskDeltedPublisher } from "../event/publisher/task.delete.publisher";
import { kafka_client } from "../kafka.wrapper";

const router = express.Router();

router.delete("/:id", currentUser, validateRequest, async (req: Request, res: Response) => {

     
  const userId = req.currentUser?.id
  
    
  const taskid = req.params.id
  

  const task = await Task.findById(taskid)
  
  if (!task) throw new NotFoundError()
  

  const deleteTask = await Task.deleteOne({ userId, _id: taskid })
  

    if (!deleteTask) {

      return res.status(404).json({ message: "Task not found" });

    }
  
  await new TaskDeltedPublisher(kafka_client).publish({ taskId:taskid, userId: userId! })
     

  res.status(202).send(deleteTask);
  
    
      
});




export { router as DeleteTaskRequest }
