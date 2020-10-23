import { IGame } from "../Models/GameModel";

export interface IGameRepository {
    getGame(id: number): Promise<IGame>;
    searchGames(): Promise<IGame[]>;
    saveGame(Game: IGame): Promise<IGame>;
}