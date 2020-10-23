import { IPlayer } from "../Models/PlayerModel";

export interface IPlayerRepository {
    getPlayer(id: number): Promise<IPlayer>;
    searchPlayers(): Promise<IPlayer[]>;
    savePlayer(player: IPlayer): Promise<IPlayer>;
}