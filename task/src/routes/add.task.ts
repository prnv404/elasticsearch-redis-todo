import express, { Request, Response } from "express";
import { body } from "express-validator";
import { currentUser, requireAuth, validateRequest } from "@prnv404/todo";
import { Task } from "../models/task.model";
import client from "../config/elasticsearch";

const router = express.Router();


interface ITask {
  title: string
  description: string
  userId?:string
}

router.post(
  "/",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("description").not().isEmpty().withMessage("Description is required"),
  ],
  validateRequest,currentUser,requireAuth, async (req: Request, res: Response) => {
     
    const { title, description } = req.body;
    
          
    const task = Task.build({ title, description, userId: req.currentUser?.id! })
    
        
    await task.save()
    

    await client.index({
      index: "task",
      document: {
        title,
        description
      }
    })

    
 
    res.status(201).send(task);
    
      
        
});

router.post("/bulk",currentUser,requireAuth, async (req: Request, res: Response) => {
     
    let tasks = req.body.tasks as ITask[]
    
    let userid = req.currentUser?.id!

    const doc = tasks.map((item:ITask) => {
      item.userId = userid
      return item
    })
              
    const result = await Task.insertMany(doc)
    

    const body: any[] = [];

    tasks.forEach((item: ITask) => {
  
      item.userId = userid;
      
      body.push(
  
        { index: { _index: 'task' } },
        
        item
    
      );
      
    });
    

     await client.bulk({ refresh: true, body });
    
    

    res.status(201).send(result);
    
      
        
});

export { router as CreateTaskRequest };
