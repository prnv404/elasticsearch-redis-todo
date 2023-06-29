import { KafkaPublisher,SUBJECT } from "@prnv404/todo";


interface TaskCreatedEvent {
    subject: SUBJECT.TASK_CREATED,
    data: {
        taskId: string
        title: string
        userId:string
    }
}

export class TaskCreatedEventPublisher extends KafkaPublisher<TaskCreatedEvent>{

    subject: SUBJECT.TASK_CREATED = SUBJECT.TASK_CREATED
    

}