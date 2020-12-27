import { IGameRepository } from "./IGameRepository";
import { injectable, inject } from "inversify";
import { IGameDao } from "../../Data/IGameDao";
import TYPES from "../../ioc/types";
import { Game, RockPaperScissors } from "../Models/Game";
import { ConcreteGameType, GameType } from "../Models/ConcreteGameType";
import { Repository } from "../../base/Domain/Repositories/Repository";
import * as DataEntities from "../../Data/Entities";
import { IGameMapper } from "../Mappers/IGameMapper";

@injectable()
export class GameRepository extends Repository<Game, DataEntities.Game> implements IGameRepository { 
    constructor(
        @inject(TYPES.IGameDao) private readonly gameDao: IGameDao,
        @inject(TYPES.IGameMapper) private readonly gameMapper: IGameMapper
    ) {
        super(gameDao, gameMapper);
    }

    createGame(name: string, gameType: GameType): Game {
        switch (gameType.type) {
            case ConcreteGameType.RockPaperScissors:
                return new RockPaperScissors(name);      
            default:
                return new Game(name, {gameTypeId: gameType.id, gameType: gameType.name});
        }        
    }
}