import { IGameService } from "./IGameService";
import { injectable, inject } from "inversify";
import TYPES from "../../ioc/types";
import { IGameRepository } from "../../Domain/Repositories/IGameRepository";
import { Game, IGame } from "../../Domain/Models/Game";
import { Service } from "../../base/Services/Service";
import { GameTypeView } from "../../Controllers/GameTypeView";
import { IGameLobbyService } from "../../Domain/Services/GameLobbyService";
import { ParticipantStatus } from "../../Domain/Models/StandardTypes/ParticipantStatus";
import { IGameMapper } from "../../Domain/Mappers/IGameMapper";

@injectable()
export class GameService extends Service<IGame, Game> implements IGameService {
    constructor(
        @inject(TYPES.IGameMapper) private readonly gameMapper: IGameMapper,
        @inject(TYPES.IGameRepository) private readonly gameRepository: IGameRepository,
        @inject(TYPES.IGameLobbyService) private readonly gameLobbyService: IGameLobbyService
    ) {
        super(gameRepository);
    }

    async createGame(lobbyName: string, lobbyCapacity: number, bestOf: number, gameTypeId: number): Promise<IGame> {
        const newGame = await this.gameLobbyService.createGameLobby(lobbyName, lobbyCapacity, bestOf, gameTypeId);
        const savedGame = await this.gameRepository.save(newGame);

        const gameType = await this.gameRepository.getGameType(gameTypeId);

        return this.gameMapper.toDto(savedGame, gameType);
    }

    async joinGame(gameId: number, playerId: number, playerName: string): Promise<IGame> {
        const game = await this.gameRepository.get(gameId);

        game.addParticipant({playerId, name: playerName, status: ParticipantStatus.Joined});

        const savedGame = await this.gameRepository.save(game);

        const gameType = await this.gameRepository.getGameType(game.type.id as number);
        
        return this.gameMapper.toDto(savedGame, gameType);
    }
}