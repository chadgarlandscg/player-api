import { IGameRepository } from "./IGameRepository";
import { injectable, inject } from "inversify";
import { IGameDao } from "../../Data/IGameDao";
import TYPES from "../../ioc/types";
import { Game } from "../Models/Game";
import { GameType } from "../Models/ConcreteGameType";
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
}