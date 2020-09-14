import { PlayerDao } from "../Data/PlayerDao";
import { Player } from "../Entities/Player";
import { IPlayerService } from "./IPlayerService";
import { IPlayerDao } from "../Data/IPlayerDao";

export class PlayerService implements IPlayerService {
    private readonly playerDao: IPlayerDao;

    constructor(playerDao: IPlayerDao) {
        this.playerDao = playerDao;
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