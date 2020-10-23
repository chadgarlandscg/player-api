import { Player } from "./Entities/Player";
import { getRepository, Repository } from "typeorm";
import { IPlayerDao } from "./IPlayerDao";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";

@injectable()
export class PlayerDao implements IPlayerDao {
    private readonly playerDataRepository: Repository<Player>;
    
    constructor(@inject(TYPES.IPlayerDataRepository) playerDataRepository: Repository<Player>) {
        this.playerDataRepository = playerDataRepository;
    }

    async getPlayer(id: number): Promise<Player | undefined> {
        const player = await this.playerDataRepository.findOne(id);
        return player;
    }

    async searchPlayers(): Promise<Player[]> {
        const players = await this.playerDataRepository.find();
        return players;
    }

    async savePlayer(player: Player): Promise<Player> {
        const savedPlayer = await this.playerDataRepository.save(player);
        return savedPlayer;
    }
}