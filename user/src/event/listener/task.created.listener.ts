import {  Kafka, KafkaMessage } from "kafkajs";
import {KafkaListener,SUBJECT } from '@prnv404/todo'
import { User } from "../../models/user";

interface TaskCreatedEvent {
    subject: SUBJECT.TASK_CREATED,
    data: {
        taskId: string
        title: string
        userId:string
    }
}


export class TaskCreatedListner extends KafkaListener<TaskCreatedEvent>{

    groupId: string = SUBJECT.TASK_CREATED
    subject: SUBJECT.TASK_CREATED = SUBJECT.TASK_CREATED

    constructor(client:Kafka) {
        super(client)
    }

   async onMessage(data: TaskCreatedEvent['data'], message: KafkaMessage): Promise<void> {

        const { title, userId, taskId } = data
        
       const user = await User.findById(userId)
       
       if (!user) throw new Error("No User Found")
       
       user.tasks?.push({ taskId, title })
       
       await user.save()
       
    }

}
