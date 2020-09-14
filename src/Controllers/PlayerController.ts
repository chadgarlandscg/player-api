import { Router, Application, Response, RequestHandler, Request } from "express"
import { PlayerDao } from "../Data/PlayerDao";
import { Player } from "../Entities/Player";
import { PlayerService } from "../Services/PlayerService";

export class PlayerController {
    public readonly base: string = "/players";
    public readonly router: Router;
    private readonly playerService: PlayerService;

    constructor() {
        this.playerService = new PlayerService();
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