import { Player } from "../Entities/Player";
import { getRepository } from "typeorm";

export class PlayerDao {
    async getPlayer(id: number): Promise<Player> {
        const playerRepository = getRepository(Player);
        const player = await playerRepository.findOne(id);
        if (!player) throw new Error("Player not found!");
        return player;
    }

    async searchPlayers(): Promise<Player[]> {
        const playerRepository = getRepository(Player);
        const players = await playerRepository.find();
        return players;
    }

    async registerPlayer(name: string, email: string): Promise<Player> {
        const playerRepository = getRepository(Player);
        const newPlayer = new Player();
        newPlayer.name = name;
        newPlayer.email = email;
        const savedPlayer = await playerRepository.save(newPlayer);
        return savedPlayer;
    }
}