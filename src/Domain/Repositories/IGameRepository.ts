import { IRepository } from "../../base/Domain/Repositories/IRepository";
import { GameType } from "../Models/ConcreteGameType";
import { Game } from "../Models/Game";
import { RockPaperScissors } from "../Models/RockPaperScissors/RockPaperScissors";

export interface IGameRepository extends IRepository<Game> {
    createGame(lobbyName: string, lobbyCapacity: number, bestOf: number, gameType: GameType): RockPaperScissors;

    getGameType(gameTypeId: number): Promise<GameType>;

    createGameLobby(lobbyName: string, lobbyCapacity: number, bestOf: number, gameTypeId: number): Promise<Game>;
}