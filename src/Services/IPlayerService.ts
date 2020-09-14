import { PlayerDao } from "../Data/PlayerDao";
import { Player } from "../Entities/Player";

export interface IPlayerService {
    searchPlayers(): Promise<Player[]>;
    getPlayer(id: number): Promise<Player>;
    registerPlayer(name: string, email: string): Promise<Player>;
}