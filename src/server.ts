import * as typeorm from "typeorm";
import express from "express";
import cors from "cors";
import { Game } from "./Entities/Game";
import { Player } from "./Entities/Player";
import { PlayerDao } from "./Data/PlayerDao";
import { PlayerService } from "./Services/PlayerService";

// typeorm.createConnection({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "psql",
//     database: "api_wars"
// }).then((connection) => {
//     return connection.query("SELECT * FROM player");
// }).then((players) => {
//     console.log(players);
// });

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

    const app = express();
    app.use(express.json());
    app.use(cors());

    const playerService = new PlayerService();

    app.get("/players", async (request, response) => {
        const players = await playerService.searchPlayers();
        response.send(players);
    });

    app.get("/players/:id", async (request, response) => {
        const player = await playerService.getPlayer(+request.params.id);
        response.send(player);
    });

    app.post("/players", async (request, response) => {
        if (!request.body.name) {
            return response.status(400).json({ error: 'Player name must be provided!' });
        }
        if (!request.body.email) {
            return response.status(400).json({ error: 'Player email must be provided!' });
        }
        const savedPlayer = await playerService.registerPlayer(request.body.name, request.body.email);
        response.send(savedPlayer);
    })
    
    app.listen(9999, () => {
        console.log("app is running");
    });
}

runApp();
