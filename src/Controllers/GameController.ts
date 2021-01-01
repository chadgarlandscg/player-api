import { Request } from "express"
import { interfaces, controller, httpGet, httpPost, requestBody, requestParam } from "inversify-express-utils"
import { IGameService } from "../Application/Services/IGameService";
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
    async create(
        @requestBody() body: {
            lobbyName: string,
            lobbyCapacity: number,
            bestOf: number,
            gameTypeId: number,
            gameTypeName: string
        }
    ): Promise<GameView> {
        const {lobbyName, lobbyCapacity, bestOf, gameTypeId} = body;
        if (!lobbyName) throw new Error('Lobby name must be provided!');
        const newGame = await this.gameService.createGame(lobbyName, lobbyCapacity, bestOf, gameTypeId);
        return this.gameMapper.toView(newGame);
    }

    @httpPost("/:id/players/")
    async join(
        @requestParam("id") id: number,
        @requestBody() body: {
            playerId: number,
            name: string,
        }
    ): Promise<GameView> {
        const {playerId, name} = body;
        const newGame = await this.gameService.joinGame(id, playerId, name);
        return this.gameMapper.toView(newGame);
    }
}