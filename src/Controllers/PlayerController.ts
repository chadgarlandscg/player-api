import { Router, Application, Response, RequestHandler, Request } from "express"
import { PlayerService } from "../Services/PlayerService";
import { IController } from "./IController";
import { IPlayerService } from "../Services/IPlayerService";

export class PlayerController implements IController {
    public readonly base: string = "/players";
    public readonly router: Router;
    private readonly playerService: IPlayerService;

    constructor(playerService: IPlayerService) {
        this.playerService = playerService;
        this.router = Router();
        this.router.get("/", this.search.bind(this));
        this.router.get("/:id", this.get.bind(this));
        this.router.post("/", this.create.bind(this));
    }

    async search(request: Request, response: Response): Promise<any> {
        const players = await this.playerService.searchPlayers();
        response.send(players);
    }

    async get(request: Request, response: Response): Promise<any> {
        const player = await this.playerService.getPlayer(+request.params.id);
        response.send(player);
    }

    async create(request: Request, response: Response): Promise<any> {
        const {name, email} = request.body;
        if (!name) return response.status(400).json({ error: 'Player name must be provided!' });
        if (!email) return response.status(400).json({ error: 'Player email must be provided!' });
        const newlyRegisteredPlayer = await this.playerService.registerPlayer(name, email);
        response.send(newlyRegisteredPlayer);
    }
}