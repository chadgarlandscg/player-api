import { Player } from "./Entities/Player";
import { getRepository, Repository } from "typeorm";
import { IPlayerDao } from "./IPlayerDao";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";

@injectable()
export class PlayerDao implements IPlayerDao {
    private readonly playerRepository: Repository<Player>;
    
    constructor(@inject(TYPES.IPlayerRepository) playerRepository: Repository<Player>) {
        this.playerRepository = playerRepository;
    }

    async getPlayer(id: number): Promise<Player | undefined> {
        const player = await this.playerRepository.findOne(id);
        return player;
    }

    async searchPlayers(): Promise<Player[]> {
        const players = await this.playerRepository.find();
        return players;
    }

    async savePlayer(player: Player): Promise<Player> {
        const savedPlayer = await this.playerRepository.save(player);
        return savedPlayer;
    }
}