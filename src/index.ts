import * as typeorm from "typeorm";
import express, { Response } from "express";
import cors from "cors";
import { Game } from "./Entities/Game";
import { Player } from "./Entities/Player";
import { PlayerDao } from "./Data/PlayerDao";
import { PlayerController } from "./Controllers/PlayerController";

async function runApp() {
    const connection = await typeorm.createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "psql",
        database: "player-api",
        synchronize: true,
        entities: [Game, Player]
    });

    const playerDao = new PlayerDao();

    const app = express();
    app.use(express.json());
    app.use(cors());

    const playerController = new PlayerController();
    app.use(playerController.base, playerController.router);
    
    app.listen(9999, () => {
        console.log("app is running");
    });
}

runApp();
