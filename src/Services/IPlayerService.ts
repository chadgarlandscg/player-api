import { PlayerDao } from "../Data/PlayerDao";
import { Player } from "../Data/Entities/Player";

export interface IPlayerService {
    searchPlayers(): Promise<Player[]>;
    getPlayer(id: number): Promise<Player>;
    registerPlayer(username: string): Promise<Player>;
}