import { Player } from "../Entities/Player";
import { getRepository } from "typeorm";

export class PlayerDao {
    async getById(id: number): Promise<Player | undefined> {
        const playerRepository = getRepository(Player);
        const player = await playerRepository.findOne(id);
        return player;
    }

    async search(): Promise<Player[]> {
        const playerRepository = getRepository(Player);
        const players = await playerRepository.find();
        return players;
    }

    async save(newPlayer: Player): Promise<Player> {
        const playerRepository = getRepository(Player);
        const registeredPlayer = await playerRepository.save(newPlayer);
        return registeredPlayer;
    }
}