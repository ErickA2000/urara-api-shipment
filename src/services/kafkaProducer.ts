import { Kafka, Message, Producer, ProducerBatch, TopicMessages } from 'kafkajs'
import { brokers_kafka, clientId_shipment_kafka, topic_shipment_kafka } from 'config'
import { CustomMessageFormat } from '@Interfaces/kafka.interface';

export default class ProducerFactory {
    private producer: Producer

    constructor() {
        this.producer = this.createProducer()
    }

    public async start(): Promise<void> {
        try {
            await this.producer.connect()
            console.log("connect kafka");
        } catch (error) {
            console.log('Error connecting the producer: ', error)
        }
    }

    public async shutdown(): Promise<void> {
        await this.producer.disconnect()
        console.log("disconnect")
    }

    public async sendBatch(messages: Array<CustomMessageFormat>): Promise<void> {
        const kafkaMessages: Array<Message> = messages.map((message) => {
            return {
                value: JSON.stringify(message)
            }
        })

        const topicMessages: TopicMessages = {
            topic: topic_shipment_kafka,
            messages: kafkaMessages
        }

        const batch: ProducerBatch = {
            topicMessages: [topicMessages]
        }

        await this.producer.sendBatch(batch)
    }

    private createProducer(): Producer {
        const kafka = new Kafka({
            clientId: clientId_shipment_kafka,
            brokers: brokers_kafka,
            authenticationTimeout: 3000,
            connectionTimeout: 5000
        })

        return kafka.producer()
    }
}