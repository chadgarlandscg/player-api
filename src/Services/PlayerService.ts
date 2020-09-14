import { PlayerDao } from "../Data/PlayerDao";
import { Player } from "../Entities/Player";

export class PlayerService {
    async getPlayer(id: number): Promise<Player> {
        const playerDao = new PlayerDao();
        const player = await playerDao.getById(id);
        if (!player) {
            throw new Error("Player not found!");
        }
        return player;
    }

    async searchPlayers(): Promise<Player[]> {
        const playerDao = new PlayerDao();
        const players = await playerDao.search();
        return players;
    }

    async registerPlayer(name: string, email: string): Promise<Player> {
        const playerDao = new PlayerDao();
        const newPlayer = new Player();
        newPlayer.name = name;
        newPlayer.email = email;
        const registeredPlayer = await playerDao.save(newPlayer);
        return registeredPlayer;
    }
}