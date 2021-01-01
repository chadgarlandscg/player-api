import { IGameRepository } from "./IGameRepository";
import { injectable, inject } from "inversify";
import { IGameDao } from "../../Data/IGameDao";
import TYPES from "../../ioc/types";
import { Game } from "../Models/Game";
import { RockPaperScissors } from "../Models/RockPaperScissors/RockPaperScissors";
import { ConcreteGameType, GameType } from "../Models/ConcreteGameType";
import { Repository } from "../../base/Domain/Repositories/Repository";
import * as DataEntities from "../../Data/Entities";
import { IGameMapper } from "../Mappers/IGameMapper";
import { IGameTypeDao } from "../../Data/IGameTypeDao";
import { DomainError } from "../Errors/DomainError";
import { GameStatus } from "../Models/StandardTypes/GameStatus";

@injectable()
export class GameRepository extends Repository<Game, DataEntities.Game> implements IGameRepository { 
    constructor(
        @inject(TYPES.IGameTypeDao) private readonly gameTypeDao: IGameTypeDao,
        @inject(TYPES.IGameDao) private readonly gameDao: IGameDao,
        @inject(TYPES.IGameMapper) private readonly gameMapper: IGameMapper
    ) {
        super(gameDao, gameMapper);
    }

    async getGameType(gameTypeId: number): Promise<GameType> {
        const gameTypeData = await this.gameTypeDao.get(gameTypeId);
        if (!gameTypeData) {
            throw new DomainError("Game type does not exist.");
        }
        const gameType = new GameType(gameTypeData);
        return gameType;
    }

    createGame(lobbyName: string, lobbyCapacity: number, bestOf: number, gameType: GameType): RockPaperScissors {
        if (!gameType.rockPaperScissors()) {
            throw new Error("Must be of type Rock Paper Scissors.");
        }
        return new RockPaperScissors({lobbyName, lobbyCapacity, bestOf, participants: [], status: GameStatus.Created, type: gameType});
    }

    async createGameLobby(lobbyName: string, lobbyCapacity: number, bestOf: number, gameTypeId: number): Promise<Game> {
        const gameType = await this.getGameType(gameTypeId);
        if (!gameType.isSupported()) {
            throw new DomainError("Game type is not available to play.");
        }

        return new Game({lobbyName, lobbyCapacity, bestOf, participants: [], status: GameStatus.Created, type: gameType});
        
        // switch (gameType.type) {
        //     case ConcreteGameType.RockPaperScissors:
        //         return this.createGame(lobbyName, lobbyCapacity);
        //     default:
        //         throw new DomainError("Game type is not concrete.");
        // }        
    }
}