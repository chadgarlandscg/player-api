import { IGameRepository } from "./IGameRepository";
import { injectable, inject } from "inversify";
import { IGameDao } from "../../Data/IGameDao";
import TYPES from "../../ioc/types";
import { Game } from "../Models/Game";
import { GameType } from "../Models/ConcreteGameType";
import { Repository } from "../../base/Domain/Repositories/Repository";
import { IGameRepositoryMapper } from "../Mappers/IGameMapper";
import { IGameTypeDao } from "../../Data/IGameTypeDao";
import { DomainError } from "../Errors/DomainError";
import { GameData } from "../../Data/Entities";

@injectable()
export class GameRepository extends Repository<Game, GameData> implements IGameRepository { 
    @inject(TYPES.IGameTypeDao)
    private readonly gameTypeDao: IGameTypeDao;

    constructor(
        @inject(TYPES.IGameDao) private readonly gameDao: IGameDao,
        @inject(TYPES.IGameRepositoryMapper) private readonly gameMapper: IGameRepositoryMapper
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