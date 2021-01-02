import { IGame } from "../../Domain/Models/Game";
import { IService } from "../../base/Services/IService";
import { CreateGameCommand } from "../../Domain/Commands/CreateGameCommand";

export interface IGameService extends IService<IGame> {
    createGame(createGameCommand: CreateGameCommand): Promise<IGame>;
    joinGame(gameId: number, playerId: number, playerName: string): Promise<IGame>;
}