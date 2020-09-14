import { PlayerDao } from "../Data/PlayerDao";
import { Player } from "../Entities/Player";

export class PlayerService {
    private readonly playerDao: PlayerDao;

    constructor() {
        this.playerDao = new PlayerDao();
    }

    async searchPlayers(): Promise<Player[]> {
        const players = await this.playerDao.searchPlayers();
        return players;
    }

    async getPlayer(id: number): Promise<Player> {
        const player = await this.playerDao.getPlayer(id);
        if (!player) throw new Error("Player not found!");
        return player;
    }

    async registerPlayer(name: string, email: string): Promise<Player> {
        const newPlayer = new Player();
        newPlayer.name = name;
        newPlayer.email = email;
        const newlyRegisteredPlayer = await this.playerDao.savePlayer(newPlayer);
        return newlyRegisteredPlayer;
    }
}