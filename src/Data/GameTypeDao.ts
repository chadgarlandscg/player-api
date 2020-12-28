import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";
import { Dao } from "../base/Data/Dao";
import { GameType } from "./Entities";
import { IGameTypeDataRepository } from "./Repositories/IGameTypeDataRepository";
import { IGameTypeDao } from "./IGameTypeDao";

@injectable()
export class GameTypeDao extends Dao<GameType> implements IGameTypeDao {    
    constructor(@inject(TYPES.IGameTypeDataRepository) private readonly gameTypeDataRepository: IGameTypeDataRepository) {
        super(gameTypeDataRepository);
    }
}