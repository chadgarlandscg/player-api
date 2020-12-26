import { IGameRepository } from "./IGameRepository";
import { injectable, inject } from "inversify";
import { IGameDao } from "../../Data/IGameDao";
import TYPES from "../../ioc/types";
import { GameModel, IGame, RockPaperScissors } from "../Models/GameModel";
import { GameMapper } from "../Mappers/GameMapper";
import { ConcreteGameType, GameTypeModel } from "../Models/ConcreteGameType";

@injectable()
export class GameRepository implements IGameRepository {
    private readonly gameDao: IGameDao;
    
    constructor(@inject(TYPES.IGameDao) gameDao: IGameDao) {
        this.gameDao = gameDao;
    }

    async getGame(id: number): Promise<GameModel> {
        const gameData = await this.gameDao.getGame(id);
        if (!gameData) throw new Error("Game not found!");
        const game = GameMapper.toGameModel(gameData);
        return game;
    }

    async searchGames(): Promise<GameModel[]> {
        const gamesData = await this.gameDao.searchGames();
        const games = gamesData.map(GameMapper.toGameModel)
        return games;
    }

    async saveGame(game: GameModel): Promise<GameModel> {
        const gameData = GameMapper.toGameData(game);
        const savedGameData = await this.gameDao.saveGame(gameData);
        const savedGame = GameMapper.toGameModel(savedGameData);
        return savedGame;
    }

    createGame(name: string, gameType: GameTypeModel): GameModel {
        switch (gameType.type) {
            case ConcreteGameType.RockPaperScissors:
                return new RockPaperScissors(gameType.id, name);      
            default:
                return new GameModel(gameType, name);
        }        
    }
}