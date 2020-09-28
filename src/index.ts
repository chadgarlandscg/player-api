import "reflect-metadata" // gives us decorators for the di container
import * as typeorm from "typeorm";
import express, { Response } from "express";
import cors from "cors";
import { Game } from "./Entities/Game";
import { Player } from "./Entities/Player";
import { InversifyExpressServer } from "inversify-express-utils";
import { bindings } from "./ioc/inversify.config";
import { Container } from "inversify";

async function runApp() {
    await typeorm.createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "psql",
        database: "player-api",
        synchronize: true,
        entities: [Game, Player]
    });

    const container = new Container();
    container.load(bindings);
    const server = new InversifyExpressServer(container);
    server.setConfig(app => {
        app.use(express.json());
        app.use(cors());
    })

    server.build().listen(9999, () => console.log("Server app is listening."));
}

runApp();
