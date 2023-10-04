import dotenv from "dotenv";
dotenv.config();

import { initialModels } from "@Libs/initialSetup";
initialModels();

import App from "app";


const server = new App();

server.start();