import { Router, Application, Response, RequestHandler, Request } from "express"
import { IController } from "./IController";
import { interfaces, controller, httpGet, httpPost } from "inversify-express-utils"
import { IGameService } from "../Services/IGameService";
import { inject } from "inversify";
import TYPES from "../ioc/types";

@controller("/games")
export class GameController implements interfaces.Controller {
    private readonly gameService: IGameService;

    constructor(@inject(TYPES.IGameService) gameService: IGameService) {
        this.gameService = gameService;
    }

    @httpGet("/")
    async search(request: Request, response: Response): Promise<any> {
        const games = await this.gameService.searchGames();
        response.send(games);
    }

    @httpGet("/:id")
    async get(request: Request, response: Response): Promise<any> {
        const game = await this.gameService.getGame(+request.params.id);
        response.send(game);
    }

    @httpPost("/")
    async create(request: Request, response: Response): Promise<any> {
        const {name, capacity} = request.body;
        if (!name) return response.status(400).json({ error: 'Game name must be provided!' });
        if (!capacity) return response.status(400).json({ error: 'Game capacity must be selected!' });
        const newlyRegisteredGame = await this.gameService.createGame(name, capacity);
        response.send(newlyRegisteredGame);
    }

    @httpPost("/:id/players/:playerId")
    async join(request: Request, response: Response): Promise<any> {
        const gameWithJoinedPlayer = await this.gameService.joinGame(+request.params.id, +request.params.playerId);
        response.send(gameWithJoinedPlayer);
    }
}