import { IGameRepository } from "./IGameRepository";
import { injectable, inject } from "inversify";
import { IGameDao } from "../../Data/IGameDao";
import TYPES from "../../ioc/types";
import { GameModel, IGame, RockPaperScissors } from "../Models/GameModel";
import { GameMapper } from "../Mappers/GameMapper";
import { ConcreteGameType, GameTypeModel } from "../Models/ConcreteGameType";
import { Repository } from "../../base/Domain/Repositories/Repository";
import { Game } from "../../Data/Entities/Game";
import { IGameMapper } from "../Mappers/IGameMapper";
import { gameTypes } from "../Models/StandardTypes/GameTypes";

@injectable()
export class GameRepository extends Repository<GameModel, Game> implements IGameRepository { 
    constructor(
        @inject(TYPES.IGameDao) private readonly gameDao: IGameDao,
        @inject(TYPES.IGameMapper) private readonly gameMapper: IGameMapper
    ) {
        super(gameDao, gameMapper);
    }

    createGame(name: string, gameType: GameTypeModel): GameModel {
        switch (gameType.type) {
            case ConcreteGameType.RockPaperScissors:
                return new RockPaperScissors(name);      
            default:
                return new GameModel(name, {gameTypeId: gameType.id, gameType: gameType.name});
        }        
    }
}