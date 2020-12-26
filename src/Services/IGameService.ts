import { GameDao } from "../Data/GameDao";
import { Game } from "../Data/Entities/Game";
import { GameView } from "../Controllers/GameView";
import { GameModel, IGame } from "../Domain/Models/GameModel";
import { IGameType } from "../Domain/Models/ConcreteGameType";

export interface IGameService {
    searchGames(): Promise<IGame[]>;
    getGame(id: number): Promise<IGame>;
    createGame(name: string, gameType: IGameType): Promise<GameModel>;
}