import {  Kafka, KafkaMessage } from "kafkajs";
import {KafkaListener,SUBJECT } from '@prnv404/todo'
import { User } from "../../models/user";

interface TaskDeletedEvent {
    subject: SUBJECT.TASK_DELETED,
    data: {
        taskId: string
        userId:string
    }
}


export class TaskDeletedListner extends KafkaListener<TaskDeletedEvent>{

    groupId: string = SUBJECT.TASK_DELETED
    subject: SUBJECT.TASK_DELETED = SUBJECT.TASK_DELETED

    constructor(client:Kafka) {
        super(client)
    }

   async onMessage(data:TaskDeletedEvent ['data'], message: KafkaMessage): Promise<void> {

       const { userId, taskId} = data
       
        
       const user = await User.findById(userId)
       
       if (!user) throw new Error("No User Found")

       const task = user.tasks
       
       user.tasks = task?.filter((item) => {
           if (item.taskId !== taskId) {
               return item
           }
       })
       
    
       await user.save()
    }

}
