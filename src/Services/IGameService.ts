import { Game, IGame } from "../Domain/Models/Game";
import { IGameType } from "../Domain/Models/ConcreteGameType";
import { IService } from "../base/Services/IService";

export interface IGameService extends IService<IGame> {
    createGame(lobbyName: string, lobbyCapacity: number, gameType: IGameType): Promise<IGame>;
}