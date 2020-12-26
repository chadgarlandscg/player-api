import { IRepository } from "../../base/Domain/Repositories/IRepository";
import { GameTypeModel } from "../Models/ConcreteGameType";
import { GameModel } from "../Models/GameModel";

export interface IGameRepository extends IRepository<GameModel> {
    createGame(name: string, gameType: GameTypeModel): GameModel;
}