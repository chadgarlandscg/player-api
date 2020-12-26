import { Game } from "./Entities/Game";
import { getRepository, Repository } from "typeorm";
import { IGameDao } from "./IGameDao";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";
import { Dao } from "../base/Data/Dao";
import { IGameDataRepository } from "./IGameDataRepository";

@injectable()
export class GameDao extends Dao<Game> implements IGameDao {    
    constructor(@inject(TYPES.IGameDataRepository) private readonly gameDataRepository: IGameDataRepository) {
        super(gameDataRepository)
    }
}