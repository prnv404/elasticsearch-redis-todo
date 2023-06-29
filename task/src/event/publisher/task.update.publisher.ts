import { KafkaPublisher,SUBJECT } from "@prnv404/todo";


interface TaskUpdateEvent {
    subject: SUBJECT.TASK_UPDATED,
    data: {
        title?: string
        description?:string
    }
}

export class TaskUpdateEventPublisher extends KafkaPublisher<TaskUpdateEvent>{

    subject: SUBJECT.TASK_UPDATED = SUBJECT.TASK_UPDATED
    

}