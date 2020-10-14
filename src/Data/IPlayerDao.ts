import { Player } from "./Entities/Player";
import { getRepository } from "typeorm";

export interface IPlayerDao {
    getPlayer(id: number): Promise<Player | undefined>;
    searchPlayers(): Promise<Player[]>;
    savePlayer(player: Player): Promise<Player>;
}