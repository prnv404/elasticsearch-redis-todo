import { Kafka } from "kafkajs";

export const kafka_client = new Kafka({ clientId:'User',brokers:['my-release-kafka:9092']})