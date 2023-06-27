import express, { Request, Response } from "express";
import { BadRequestError, NotFoundError, currentUser, requireAuth, validateRequest } from "@prnv404/todo";
import { Task } from "../models/task.model";
import client from '../config/elasticsearch'

    
interface ITask {
    description: string,
    title:string
}


const router = express.Router();

router.get("/all", currentUser,requireAuth, validateRequest, async (req: Request, res: Response) => {
     
    let task = await Task.find({userId:req.currentUser?.id!})

    if (!task) throw new NotFoundError()
    
    res.status(200).send(task);
})

router.get( "/:id", currentUser,requireAuth,validateRequest, async (req: Request, res: Response) => {
     
    const id = req.params.id

    let task = await Task.findById(id)

    if (!task) throw new NotFoundError()
    
    res.status(200).send(task);
      
});




    
export { router as  QueryTaskRequest}
