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

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get("/players", async (request, response) => {
        const players = await connection.query("SELECT * FROM player");
        response.send(players);
    });

    app.get("/players/:id", async (request, response) => {
        const results = await connection.query("SELECT * FROM player where id = $1", [request.params.id]);
        const player = results[0];
        response.send(player);
    });

    app.post("/players", async (request, response) => {
        const playerNameFromPayload = request.body.name;
        if (!playerNameFromPayload) {
            return response.status(400).json({ error: 'Player name must be provided!' });
        }
        await connection.query(`INSERT INTO public.player ("name", health) VALUES($1, 100);`, [playerNameFromPayload]);
        response.send("Success!");
    })
    
    app.listen(9999, () => {
        console.log("app is running");
    });
}

runApp();
