import * as typeorm from "typeorm";
import express, { Response } from "express";
import cors from "cors";
import { Game } from "./Entities/Game";
import { Player } from "./Entities/Player";

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

    const playerRepository = connection.getRepository(Player);

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get("/players", async (request, response) => {
        const players = await playerRepository.find();
        response.send(players);
    });

    app.get("/players/:id", async (request, response) => {
        const player = await playerRepository.findOne(request.params.id);
        response.send(player);
    });

    app.post("/players", async (request, response) => {
        if (!request.body.name) return response.status(400).json({ error: 'Player name must be provided!' });
        if (!request.body.email) return response.status(400).json({ error: 'Player email must be provided!' });
        const newPlayer = new Player();
        newPlayer.name = request.body.name;
        newPlayer.email = request.body.email;
        await playerRepository.save(newPlayer)
        response.send(newPlayer);
    })
    
    app.listen(9999, () => {
        console.log("app is running");
    });
}

runApp();
