import { KafkaPublisher,SUBJECT } from "@prnv404/todo";


interface TaskDelted {
    subject: SUBJECT.TASK_DELETED
    data: {
        taskId: string,
        userId: string,
    }
}

export class TaskDeltedPublisher extends KafkaPublisher<TaskDelted>{

    subject: SUBJECT.TASK_DELETED = SUBJECT.TASK_DELETED
    
}