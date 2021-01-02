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
import { CreateGameCommand } from "../../Domain/Commands/CreateGameCommand";

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

    async createGame(createGameCommand: CreateGameCommand): Promise<IGame> {
        const newGame = await this.gameSetupService.createGameLobby(createGameCommand);
        const savedGame = await this.gameRepository.save(newGame);

        const gameType = await this.gameRepository.getGameType(createGameCommand.gameTypeId);

        return this.gameMapper.toDto(savedGame, gameType);
    }

    async joinGame(gameId: number, playerId: number, playerName: string): Promise<IGame> {
        const game = await this.gameRepository.get(gameId);

        game.addParticipant(playerId, playerName);

        const savedGame = await this.gameRepository.save(game);

        const gameType = await this.gameRepository.getGameType(game.type.id as number);
        
        return this.gameMapper.toDto(savedGame, gameType);
    }
}