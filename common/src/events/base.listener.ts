import { Kafka, KafkaMessage, Consumer, ConsumerRunConfig } from 'kafkajs';

interface Event {
  subject: string;
  data: any;
}

export abstract class KafkaListener<T extends Event> {

    abstract subject: T['subject'];
    
    abstract groupId: string;
    
    abstract onMessage(data: T['data'], message: KafkaMessage): void;
    
    protected kafka: Kafka;
    
    protected consumer!: Consumer;
    

    constructor(client:Kafka) {
      
        this.kafka = client
        
    }
    

    async listen(): Promise<void> {

        this.consumer = this.kafka.consumer({ groupId: this.groupId });
        
        await this.consumer.connect();
        
        await this.consumer.subscribe({ topic: this.subject });
        
        await this.consumer.run({
        
            eachMessage: async ({ topic, partition, message }) => {
                
                const parsedData: T['data'] = JSON.parse(message.value!.toString());

                console.log("MESSAGE RECEIVED FROM ----->>>>" + topic)
                
                this.onMessage(parsedData, message);
                
            },
            
        } as ConsumerRunConfig);
        
  }

    async disconnect(): Promise<void> {
      
        await this.consumer.disconnect();
        
    }
    
}
