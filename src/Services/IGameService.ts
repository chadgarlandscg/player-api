import { GameDao } from "../Data/GameDao";
import { Game } from "../Data/Entities/Game";
import { GameView } from "../Controllers/GameView";
import { GameModel, IGame } from "../Domain/Models/GameModel";
import { IGameType } from "../Domain/Models/ConcreteGameType";
import { IService } from "../base/Services/IService";

export interface IGameService extends IService<GameModel> {
    createGame(name: string, gameType: IGameType): Promise<GameModel>;
}