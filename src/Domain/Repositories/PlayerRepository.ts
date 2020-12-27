import { IPlayerRepository } from "./IPlayerRepository";
import { injectable, inject } from "inversify";
import { IPlayerDao } from "../../Data/IPlayerDao";
import TYPES from "../../ioc/types";
import { Player } from "../Models/Player";
import { PlayerMapper } from "../Mappers/PlayerMapper";

@injectable()
export class PlayerRepository implements IPlayerRepository {
    private readonly playerDao: IPlayerDao;
    
    constructor(@inject(TYPES.IPlayerDao) playerDao: IPlayerDao) {
        this.playerDao = playerDao;
    }

    async getPlayer(id: number): Promise<Player> {
        const playerData = await this.playerDao.getPlayer(id);
        if (!playerData) throw new Error("Player not found!");
        const player = PlayerMapper.toPlayerModel(playerData);
        return player;
    }

    async searchPlayers(): Promise<Player[]> {
        const playersData = await this.playerDao.searchPlayers();
        const players = playersData.map(PlayerMapper.toPlayerModel)
        return players;
    }

    async savePlayer(player: Player): Promise<Player> {
        const playerData = PlayerMapper.toPlayerData(player);
        const savedPlayerData = await this.playerDao.savePlayer(playerData);
        const savedPlayer = PlayerMapper.toPlayerModel(savedPlayerData);
        return savedPlayer;
    }
}