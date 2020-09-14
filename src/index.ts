import * as typeorm from "typeorm";
import express, { Response } from "express";
import cors from "cors";
import { Game } from "./Entities/Game";
import { Player } from "./Entities/Player";
import { PlayerDao } from "./Data/PlayerDao";

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

    app.get("/players", async (request, response) => {
        const players = await playerDao.searchPlayers();
        response.send(players);
    });

    app.get("/players/:id", async (request, response) => {
        const player = await playerDao.getPlayer(+request.params.id);
        response.send(player);
    });

    app.post("/players", async (request, response) => {
        const {name, email} = request.body;
        if (!name) return response.status(400).json({ error: 'Player name must be provided!' });
        if (!email) return response.status(400).json({ error: 'Player email must be provided!' });
        const newlyRegisteredPlayer = await playerDao.registerPlayer(name, email);
        response.send(newlyRegisteredPlayer);
    })
    
    app.listen(9999, () => {
        console.log("app is running");
    });
}

runApp();
