import { Kafka } from "kafkajs";

export const kafka_client = new Kafka({ clientId:'Task',brokers:['my-release-kafka:9092']})