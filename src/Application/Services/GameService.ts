import { IGameService } from "./IGameService";
import { injectable, inject } from "inversify";
import TYPES from "../../ioc/types";
import { IGameRepository } from "../../Domain/Repositories/IGameRepository";
import { Game, IGame } from "../../Domain/Models/Game";
import { Service } from "../../base/Services/Service";
import { GameTypeView } from "../../Controllers/GameTypeView";
import { IGameSetupService } from "../../Domain/Services/GameSetupService";
import { ParticipantStatus } from "../../Domain/Models/StandardTypes/ParticipantStatus";
import { IGameServiceMapper } from "../../Domain/Mappers/IGameMapper";
import { Participant } from "../../Domain/Models/Participant";

@injectable()
export class GameService extends Service<IGame, Game> implements IGameService {
    @inject(TYPES.IGameSetupService)
    private readonly gameSetupService: IGameSetupService;

    constructor(
        @inject(TYPES.IGameRepository) private readonly gameRepository: IGameRepository,
        @inject(TYPES.IGameServiceMapper) private readonly gameMapper: IGameServiceMapper,
    ) {
        super(gameRepository, gameMapper);
    }

    async createGame(lobbyName: string, lobbyThreshold: number, lobbyCapacity: number, bestOf: number, gameTypeId: number): Promise<IGame> {
        const newGame = await this.gameSetupService.createGameLobby(lobbyName, lobbyThreshold, lobbyCapacity, bestOf, gameTypeId);
        const savedGame = await this.gameRepository.save(newGame);

        const gameType = await this.gameRepository.getGameType(gameTypeId);

        return this.gameMapper.toDto(savedGame, gameType);
    }

    async joinGame(gameId: number, playerId: number, playerName: string): Promise<IGame> {
        const game = await this.gameRepository.get(gameId);

        const participant = new Participant(playerName, playerId);
        game.addParticipant(participant);

        const savedGame = await this.gameRepository.save(game);

        const gameType = await this.gameRepository.getGameType(game.type.id as number);
        
        return this.gameMapper.toDto(savedGame, gameType);
    }
}