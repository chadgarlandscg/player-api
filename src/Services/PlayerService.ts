import { PlayerDao } from "../Data/PlayerDao";
import { Player } from "../Data/Entities/Player";
import { IPlayerService } from "./IPlayerService";
import { IPlayerDao } from "../Data/IPlayerDao";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";

@injectable()
export class PlayerService implements IPlayerService {
    private readonly playerDao: IPlayerDao;

    constructor(@inject(TYPES.IPlayerDao) playerDao: IPlayerDao) {
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

    async registerPlayer(username: string): Promise<Player> {
        const newPlayer = new Player();
        newPlayer.username = username;
        const newlyRegisteredPlayer = await this.playerDao.savePlayer(newPlayer);
        return newlyRegisteredPlayer;
    }
}