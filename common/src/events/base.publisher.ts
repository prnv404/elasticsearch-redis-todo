import { Kafka, Producer } from 'kafkajs';

interface Event {
  subject: string;
  data: any;
}

export abstract class KafkaPublisher<T extends Event> {

    abstract subject: T['subject'];
    
    protected kafka: Kafka;
    
    protected producer: Producer;
    

    constructor(client:Kafka) {
      
        this.kafka = client
        
        this.producer = this.kafka.producer();
        
    }
    

    async publish(data: T['data']): Promise<void> {

      try {

          
        await this.producer.connect();
          
        await this.producer.send({ topic: this.subject, messages: [{ value: JSON.stringify(data) }] });
        
                  
        console.log('EVENT PUBLISHED TO ----->>>:', this.subject)
        

        await this.producer.disconnect()
        
            
      } catch (error) {
        
        console.error(error)
        
        }
       
    }
    
}
