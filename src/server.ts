import * as typeorm from "typeorm";
import express, { Router } from "express";
import cors from "cors";
import playerRouter from "./App/PlayerRouter";

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
    await typeorm.createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "psql",
        database: "postgres"
    });

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/players", playerRouter);
    
    app.listen(9999, () => {
        console.log("app is running");
    });
}

runApp();
