import { Router, Application, Response, RequestHandler, Request } from "express"
import { interfaces, controller, httpGet, httpPost, requestBody } from "inversify-express-utils"
import { IGameService } from "../Services/IGameService";
import { inject } from "inversify";
import TYPES from "../ioc/types";
import { GameView } from "./GameView";
import { GameMapper } from "../Domain/Mappers/GameMapper";
import { GameTypeModel } from "../Domain/Models/ConcreteGameType";

@controller("/games")
export class GameController implements interfaces.Controller {
    private readonly gameService: IGameService;

    constructor(@inject(TYPES.IGameService) gameService: IGameService) {
        this.gameService = gameService;
    }

    @httpGet("/")
    async search(): Promise<GameView[]> {
        const games = await this.gameService.searchGames();
        return games.map(GameMapper.toGameView);
    }

    @httpGet("/:id")
    async get(request: Request): Promise<GameView> {
        const game = await this.gameService.getGame(+request.params.id);
        return GameMapper.toGameView(game);
    }

    @httpPost("/")
    async create(@requestBody() body: {name: string, gameTypeId: number, gameTypeName: string}): Promise<GameView> {
        const {name, gameTypeId, gameTypeName} = body;
        if (!name) throw new Error('Game name must be provided!');
        const newGame = await this.gameService.createGame(name, new GameTypeModel(gameTypeName, gameTypeId));
        return GameMapper.toGameView(newGame);
    }
}