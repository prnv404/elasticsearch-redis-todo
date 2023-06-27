import { Client } from '@elastic/elasticsearch'
import { Kafka } from 'kafkajs';

const client = new Client({
node:'https://quickstart-es-http:9200',
auth: {
username: 'elastic',
password:"Z2CEu15ed93X28oPY47p3HyJ"
},
tls: {
rejectUnauthorized:false
}
})

interface Document {
character: string
quote: string
}

async function run() {

await client.index({
index: 'game-of-thrones',
document: {
character: 'Ned Stark',
quote: 'Winter is coming.'
}
})

await client.index({
index: 'game-of-thrones',
document: {
character: 'Daenerys Targaryen',
quote: 'I am the blood of the dragon.'
}
})

await client.index({
index: 'game-of-thrones',
document: {
character: 'Tyrion Lannister',
quote: 'A mind needs books like a sword needs a whetstone.'
}
})

await client.indices.refresh({ index: 'game-of-thrones' })

const result= await client.search<Document>({
index: 'game-of-thrones',
query: {
match: { quote: 'needs' }
}
})

await client.indices.delete({ index: 'game-of-thrones' })

console.log(result.hits.hits)

}

run().catch(console.log)

const kafka = new Kafka({
clientId: 'my-kafka-app',
brokers: ['my-release-kafka:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'hello' });

async function produceMessage(topic: string, message: string): Promise<void> {
await producer.connect();

await producer.send({
topic,
messages: [{ value: message }],
});

await producer.disconnect();
}

async function consumeMessages(topic: string): Promise<void> {
await consumer.connect();
await consumer.subscribe({ topic });

await consumer.run({
eachMessage: async ({ topic, partition, message }) => {
console.log(`Received message from topic ${topic}, partition ${partition}: ${message.value}`);
},
});
}

// Example usage

produceMessage('my-topic', 'Hello, Kafka!')
.then(() => console.log('Message produced successfully.'))
.catch((error) => console.error('Error producing message:', error));

consumeMessages('my-topic')
.then(() => console.log('Consumer started.'))
.catch((error) => console.error('Error consuming messages:', error));
