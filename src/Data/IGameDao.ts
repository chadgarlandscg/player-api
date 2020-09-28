import { Game } from "../Entities/Game";

export interface IGameDao {
    getGame(id: number): Promise<Game | undefined>;
    searchGames(): Promise<Game[]>;
    saveGame(Game: Game): Promise<Game>;
}