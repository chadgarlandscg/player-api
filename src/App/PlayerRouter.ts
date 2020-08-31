import { Router } from "express";
import { getConnection } from "typeorm";

const playerRouter = Router();

playerRouter.get("/", async (request, response) => {
    const players = await getConnection().query("SELECT * FROM player");
    response.send(players);
});

playerRouter.get("/:id", async (request, response) => {
    const results = await getConnection().query("SELECT * FROM player where id = $1", [request.params.id]);
    const player = results[0];
    response.send(player);
});

playerRouter.post("/", async (request, response) => {
    const playerNameFromPayload = request.body.name;
    if (!playerNameFromPayload) {
        return response.status(400).json({ error: 'Player name must be provided!' });
    }
    await getConnection().query(`INSERT INTO public.player ("name", health) VALUES($1, 100);`, [playerNameFromPayload]);
    response.send("Success!");
});

export default playerRouter;