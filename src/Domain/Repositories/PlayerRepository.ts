import { IPlayerRepository } from "./IPlayerRepository";
import { injectable, inject } from "inversify";
import { IPlayerDao } from "../../Data/IPlayerDao";
import TYPES from "../../ioc/types";
import { PlayerModel, IPlayer } from "../Models/PlayerModel";
import { PlayerMapper } from "../Mappers/PlayerMapper";

@injectable()
export class PlayerRepository implements IPlayerRepository {
    private readonly playerDao: IPlayerDao;
    
    constructor(@inject(TYPES.IPlayerDao) playerDao: IPlayerDao) {
        this.playerDao = playerDao;
    }

    async getPlayer(id: number): Promise<PlayerModel> {
        const playerData = await this.playerDao.getPlayer(id);
        if (!playerData) throw new Error("Player not found!");
        const player = PlayerMapper.toPlayerModel(playerData);
        return player;
    }

    async searchPlayers(): Promise<PlayerModel[]> {
        const playersData = await this.playerDao.searchPlayers();
        const players = playersData.map(PlayerMapper.toPlayerModel)
        return players;
    }

    async savePlayer(player: PlayerModel): Promise<PlayerModel> {
        const playerData = PlayerMapper.toPlayerData(player);
        const savedPlayerData = await this.playerDao.savePlayer(playerData);
        const savedPlayer = PlayerMapper.toPlayerModel(savedPlayerData);
        return savedPlayer;
    }
}