import { IPlayer } from "../Models/Player";

export interface IPlayerRepository {
    getPlayer(id: number): Promise<IPlayer>;
    searchPlayers(): Promise<IPlayer[]>;
    savePlayer(player: IPlayer): Promise<IPlayer>;
}