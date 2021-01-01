import { IGame } from "../../Domain/Models/Game";
import { IService } from "../../base/Services/IService";

export interface IGameService extends IService<IGame> {
    createGame(lobbyName: string, lobbyCapacity: number, bestOf: number, gameTypeId: number): Promise<IGame>;
    joinGame(gameId: number, playerId: number, playerName: string): Promise<IGame>;
}