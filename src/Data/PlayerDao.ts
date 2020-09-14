import { Player } from "../Entities/Player";
import { getRepository } from "typeorm";

export class PlayerDao {
    async getPlayer(id: number): Promise<Player | undefined> {
        const playerRepository = getRepository(Player);
        const player = await playerRepository.findOne(id);
        return player;
    }

    async searchPlayers(): Promise<Player[]> {
        const playerRepository = getRepository(Player);
        const players = await playerRepository.find();
        return players;
    }

    async savePlayer(player: Player): Promise<Player> {
        const playerRepository = getRepository(Player);
        const savedPlayer = await playerRepository.save(player);
        return savedPlayer;
    }
}