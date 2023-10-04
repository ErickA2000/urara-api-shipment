import createShipment from '@Helpers/createShipment';
import { MessageProcessor } from '@Interfaces/kafka.interface';
import { brokers_kafka, clientId_payment_kafka, groupId_payment_kafka, topic_payment_kafka } from 'config';
import { Consumer, ConsumerSubscribeTopics, EachBatchPayload, Kafka, EachMessagePayload } from 'kafkajs';

export default class ExampleConsumer {
    private kafkaConsumer: Consumer
    // private messageProcessor: MessageProcessor

    public constructor() {
        // this.messageProcessor = messageProcessor
        this.kafkaConsumer = this.createKafkaConsumer()
    }

    public async startConsumer(): Promise<void> {
        const topic: ConsumerSubscribeTopics = {
            topics: [ topic_payment_kafka ],
            fromBeginning: false
        }

        try {
            await this.kafkaConsumer.connect()
            await this.kafkaConsumer.subscribe(topic)

            await this.kafkaConsumer.run({
                eachMessage: async (messagePayload: EachMessagePayload) => {
                    const { topic, partition, message } = messagePayload
                    const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                    console.log(`- ${prefix} ${message.key}#${message.value}`);

                    let dataMessage: MessageProcessor = JSON.parse(`${message.value}`);

                    //creando envio
                    await createShipment( dataMessage.idCliente, dataMessage.idCompra );
                    
                }
            })
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    public async startBatchConsumer(): Promise<void> {
        const topic: ConsumerSubscribeTopics = {
            topics: [ topic_payment_kafka ],
            fromBeginning: false
        }

        try {
            await this.kafkaConsumer.connect()
            await this.kafkaConsumer.subscribe(topic)
            await this.kafkaConsumer.run({
                eachBatch: async (eachBatchPayload: EachBatchPayload) => {
                    const { batch } = eachBatchPayload
                    for (const message of batch.messages) {
                        const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`
                        console.log(`- ${prefix} ${message.key}#${message.value}`)
                    }
                }
            })
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    public async shutdown(): Promise<void> {
        await this.kafkaConsumer.disconnect()
    }

    private createKafkaConsumer(): Consumer {
        const kafka = new Kafka({
            clientId: clientId_payment_kafka,
            brokers: brokers_kafka
        })
        const consumer = kafka.consumer({ groupId: groupId_payment_kafka })
        return consumer
    }
}