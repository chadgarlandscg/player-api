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

    createGame(lobbyName: string, lobbyCapacity: number, gameType: GameType): RockPaperScissors {
        return new RockPaperScissors({lobbyName, lobbyCapacity, participants: [], type: gameType});
    }

    async createGameLobby(lobbyName: string, lobbyCapacity: number, gameTypeId: number): Promise<Game> {
        const gameType = await this.getGameType(gameTypeId);
        if (!gameType.isSupported()) {
            throw new DomainError("Game type is not available to play.");
        }

        return new Game({lobbyName, lobbyCapacity, type: gameType});
        
        // switch (gameType.type) {
        //     case ConcreteGameType.RockPaperScissors:
        //         return this.createGame(lobbyName, lobbyCapacity);
        //     default:
        //         throw new DomainError("Game type is not concrete.");
        // }        
    }
}