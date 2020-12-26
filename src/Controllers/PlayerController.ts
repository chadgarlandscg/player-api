import { Router, Application, Response, RequestHandler, Request } from "express"
import { interfaces, controller, httpGet, httpPost } from "inversify-express-utils"
import { IPlayerService } from "../Services/IPlayerService";
import { inject } from "inversify";
import TYPES from "../ioc/types";
import { PlayerView } from "./PlayerView";
import { PlayerMapper } from "../Domain/Mappers/PlayerMapper";

@controller("/players")
export class PlayerController implements interfaces.Controller {
    private readonly playerService: IPlayerService;

    constructor(@inject(TYPES.IPlayerService) playerService: IPlayerService) {
        this.playerService = playerService;
    }

    @httpGet("/")
    async search(): Promise<PlayerView[]> {
        const players = await this.playerService.searchPlayers();
        return players.map(PlayerMapper.toPlayerView);
    }

    @httpGet("/:id")
    async get(request: Request): Promise<PlayerView> {
        const player = await this.playerService.getPlayer(+request.params.id);
        return PlayerMapper.toPlayerView(player);
    }

    @httpPost("/")
    async create(request: Request): Promise<PlayerView> {
        const {username} = request.body;
        if (!username) throw new Error("Player username must be provided.");
        const newlyRegisteredPlayer = await this.playerService.registerPlayer(username);
        return PlayerMapper.toPlayerView(newlyRegisteredPlayer);
    }
}