import { inject, injectable } from "inversify";
import TYPES from "../../ioc/types";
import { CreateGameCommand } from "../Commands/CreateGameCommand";
import { DomainError } from "../Errors/DomainError";
import { Game, GameState, IGame } from "../Models/Game";
import { GameStatus } from "../Models/StandardTypes/GameStatus";
import { IGameRepository } from "../Repositories/IGameRepository";

export interface IGameSetupService {    
    createGameLobby(createGameCommand: CreateGameCommand): Promise<Game>;
}

@injectable()
export class GameSetupService implements IGameSetupService {
    constructor(
        @inject(TYPES.IGameRepository) private readonly gameRepository: IGameRepository) {
    }

    async createGameLobby({lobbyName, lobbyThreshold, lobbyCapacity, startAutomatically, bestOf, gameTypeId}: CreateGameCommand): Promise<Game> {
        const gameType = await this.gameRepository.getGameType(gameTypeId);
        if (!gameType.isSupported()) {
            throw new DomainError("Game type is not available to play.");
        }

        const gameState = new GameState();
        gameState.lobbyName = lobbyName;
        gameState.lobbyThreshold = lobbyThreshold;
        gameState.lobbyCapacity = lobbyCapacity;
        gameState.bestOf = bestOf;
        gameState.startAutomatically = startAutomatically;
        gameState.status = GameStatus.Created;
        gameState.type = gameType;

        return new Game(gameState);
    }
}