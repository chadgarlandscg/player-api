import { IRepository } from "../../base/Domain/Repositories/IRepository";
import { GameType } from "../Models/ConcreteGameType";
import { Game } from "../Models/Game";

export interface IGameRepository extends IRepository<Game> {
    getGameType(gameTypeId: number): Promise<GameType>;
}