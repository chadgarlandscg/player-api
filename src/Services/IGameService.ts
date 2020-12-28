import { Game, IGame } from "../Domain/Models/Game";
import { IService } from "../base/Services/IService";

export interface IGameService extends IService<IGame> {
    createGame(lobbyName: string, lobbyCapacity: number, gameTypeId: number): Promise<IGame>;
}