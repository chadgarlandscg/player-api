import { Router, Application, Response, RequestHandler, Request } from "express"
import { IController } from "./IController";
import { interfaces, controller, httpGet, httpPost } from "inversify-express-utils"
import { IPlayerService } from "../Services/IPlayerService";
import { inject } from "inversify";
import TYPES from "../ioc/types";

@controller("/players")
export class PlayerController implements interfaces.Controller {
    private readonly playerService: IPlayerService;

    constructor(@inject(TYPES.IPlayerService) playerService: IPlayerService) {
        this.playerService = playerService;
    }

    @httpGet("/")
    async search(request: Request, response: Response): Promise<any> {
        const players = await this.playerService.searchPlayers();
        response.send(players);
    }

    @httpGet("/:id")
    async get(request: Request, response: Response): Promise<any> {
        const player = await this.playerService.getPlayer(+request.params.id);
        response.send(player);
    }

    @httpPost("/")
    async create(request: Request, response: Response): Promise<any> {
        const {name, email} = request.body;
        if (!name) return response.status(400).json({ error: 'Player name must be provided!' });
        if (!email) return response.status(400).json({ error: 'Player email must be provided!' });
        const newlyRegisteredPlayer = await this.playerService.registerPlayer(name, email);
        response.send(newlyRegisteredPlayer);
    }
}