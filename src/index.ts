import "reflect-metadata" // gives us decorators for the di container
import * as typeorm from "typeorm";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";
import { bindings } from "./ioc/inversify.config";
import { Container } from "inversify";
import * as Entities from "./Data/Entities";
import { gameTypes } from "./Domain/Models/StandardTypes/GameTypes";
import { ApplicationError } from "./Domain/Errors/DomainError";

async function runApp() {
    await typeorm.createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "psql",
        database: "api_games",
        synchronize: true,
        entities: Object.values(Entities)
    });

    const gameTypeRepo = await typeorm.getRepository(Entities.GameType);
    const alreadyInitialized = !!await gameTypeRepo.count();
    if (!alreadyInitialized) await gameTypeRepo.save(gameTypes);

    const container = new Container();
    container.load(bindings);
    const server = new InversifyExpressServer(container);
    server.setConfig(app => {
        app.use(express.json());
        app.use(cors());
    });

    server.setErrorConfig(app => {
        app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(error.stack);
            if (ApplicationError.isDomain(error)) {
                return res.status(409).send(error.message);
            } else {
                return res.status(500).send('Something broke!');
            }
        });
    })

    server.build().listen(9999, () => console.log("Server app is listening."));
}

runApp();
