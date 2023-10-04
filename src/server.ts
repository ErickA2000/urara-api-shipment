import dotenv from "dotenv";
dotenv.config();

import { initialModels } from "@Libs/initialSetup";
initialModels();

import App from "app";
import ExampleConsumer from "@Services/kafkaConsumer";

const consumer = new ExampleConsumer();
consumer.startConsumer();

const server = new App();

server.start();