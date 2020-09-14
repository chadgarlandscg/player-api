import { Router, Application, Response, RequestHandler, Request } from "express"
import { PlayerDao } from "../Data/PlayerDao";
import { Player } from "../Entities/Player";

export class PlayerController {
    public readonly base: string = "/players";
    public readonly router: Router;
    private readonly playerDao: PlayerDao;

    constructor() {
        this.playerDao = new PlayerDao();
        this.router = Router();
        this.router.get("/", this.search.bind(this));
        this.router.get("/:id", this.get.bind(this));
        this.router.post("/", this.create.bind(this));
    }

    async search(request: Request, response: Response): Promise<any> {
        const players = await this.playerDao.searchPlayers();
        response.send(players);
    }

    async get(request: Request, response: Response): Promise<any> {
        const player = await this.playerDao.getPlayer(+request.params.id);
        response.send(player);
    }

    async create(request: Request, response: Response): Promise<any> {
        const {name, email} = request.body;
        if (!name) return response.status(400).json({ error: 'Player name must be provided!' });
        if (!email) return response.status(400).json({ error: 'Player email must be provided!' });
        const newlyRegisteredPlayer = await this.playerDao.registerPlayer(name, email);
        response.send(newlyRegisteredPlayer);
    }
}