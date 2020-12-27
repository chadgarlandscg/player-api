import { Request } from "express"
import { interfaces, controller, httpGet, httpPost, requestBody } from "inversify-express-utils"
import { IGameService } from "../Services/IGameService";
import { inject } from "inversify";
import TYPES from "../ioc/types";
import { GameView } from "./GameView";
import { GameType } from "../Domain/Models/ConcreteGameType";
import { Controller } from "../base/Controllers/Controller";
import { IGame } from "../Domain/Models/Game";
import { IGameMapper } from "../Domain/Mappers/IGameMapper";

@controller("/games")
export class GameController extends Controller<GameView, IGame> implements interfaces.Controller {
    constructor(
        @inject(TYPES.IGameService) private readonly gameService: IGameService,
        @inject(TYPES.IGameMapper) private readonly gameMapper: IGameMapper
    ) {
        super(gameService, gameMapper);
    }

    @httpGet("/")
    async search(): Promise<GameView[]> {
        return super.search();
    }

    @httpGet("/:id")
    async get(request: Request): Promise<GameView> {
        return super.get(request);
    }

    @httpPost("/")
    async create(@requestBody() body: {name: string, gameTypeId: number, gameTypeName: string}): Promise<GameView> {
        const {name, gameTypeId, gameTypeName} = body;
        if (!name) throw new Error('Game name must be provided!');
        const newGame = await this.gameService.createGame(name, new GameType(gameTypeName, gameTypeId));
        return this.gameMapper.toView(newGame);
    }
}