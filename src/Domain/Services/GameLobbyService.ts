import { inject, injectable } from "inversify";
import { Service } from "../../base/Services/Service";
import TYPES from "../../ioc/types";
import { DomainError } from "../Errors/DomainError";
import { Game, GameState, IGame } from "../Models/Game";
import { GameStatus } from "../Models/StandardTypes/GameStatus";
import { IGameRepository } from "../Repositories/IGameRepository";

export interface IGameLobbyService {    
    createGameLobby(lobbyName: string, lobbyCapacity: number, bestOf: number, gameTypeId: number): Promise<Game>;
}

@injectable()
export class GameLobbyService implements IGameLobbyService {
    constructor(
        @inject(TYPES.IGameRepository) private readonly gameRepository: IGameRepository) {
    }

    async createGameLobby(lobbyName: string, lobbyCapacity: number, bestOf: number, gameTypeId: number): Promise<Game> {
        const gameType = await this.gameRepository.getGameType(gameTypeId);
        if (!gameType.isSupported()) {
            throw new DomainError("Game type is not available to play.");
        }

        const gameState = new GameState();
        gameState.lobbyName = lobbyName;
        gameState.lobbyCapacity = lobbyCapacity;
        gameState.bestOf = bestOf;
        gameState.status = GameStatus.Created;
        gameState.type = gameType;

        return new Game(gameState);
    }
}