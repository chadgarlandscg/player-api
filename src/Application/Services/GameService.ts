import { IGameService } from "./IGameService";
import { injectable, inject } from "inversify";
import TYPES from "../../ioc/types";
import { IGameRepository } from "../../Domain/Repositories/IGameRepository";
import { Game, IGame } from "../../Domain/Models/Game";
import { Service } from "../../base/Services/Service";
import { GameTypeView } from "../../Controllers/GameTypeView";
import { IGameLobbyService } from "../../Domain/Services/GameLobbyService";

@injectable()
export class GameService extends Service<IGame, Game> implements IGameService {
    constructor(
        @inject(TYPES.IGameRepository) private readonly gameRepository: IGameRepository,
        @inject(TYPES.IGameLobbyService) private readonly gameLobbyService: IGameLobbyService
    ) {
        super(gameRepository);
    }

    async createGame(lobbyName: string, lobbyCapacity: number, bestOf: number, gameTypeId: number): Promise<IGame> {
        const newGame = await this.gameLobbyService.createGameLobby(lobbyName, lobbyCapacity, bestOf, gameTypeId);
        const savedGame = await this.gameRepository.save(newGame);

        const gameType = await this.gameRepository.getGameType(gameTypeId);

        const gameDto: IGame = {
            lobbyName: savedGame.lobbyName,
            lobbyCapacity: savedGame.lobbyCapacity,
            bestOf: savedGame.bestOf,
            status: savedGame.status,
            participants: savedGame.participants,
            type: gameType,
        };

        return gameDto;
    }
}