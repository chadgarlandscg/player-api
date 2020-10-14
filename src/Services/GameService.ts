import { GameDao } from "../Data/GameDao";
import { Game } from "../Data/Entities/Game";
import { IGameService } from "./IGameService";
import { IGameDao } from "../Data/IGameDao";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";
import { IPlayerService } from "./IPlayerService";
import { GameMapper } from "../Domain/Mappers/GameMapper";
import { PlayerMapper } from "../Domain/Mappers/PlayerMapper";

@injectable()
export class GameService implements IGameService {
    private readonly gameDao: IGameDao;
    private readonly playerService: IPlayerService;

    constructor(@inject(TYPES.IGameDao) gameDao: IGameDao, @inject(TYPES.IPlayerService) playerService: IPlayerService) {
        this.gameDao = gameDao;
        this.playerService = playerService;
    }

    async searchGames(): Promise<Game[]> {
        const games = await this.gameDao.searchGames();
        return games;
    }

    async getGame(id: number): Promise<Game> {
        const game = await this.gameDao.getGame(id);
        if (!game) throw new Error("Game not found!");
        return game;
    }

    async createGame(name: string, capacity: number): Promise<Game> {
        const newGame = new Game();
        newGame.name = name;
        newGame.capacity = capacity;
        const newlyRegisteredGame = await this.gameDao.saveGame(newGame);
        return newlyRegisteredGame;
    }

    async joinGame(gameId: number, playerId: number): Promise<Game> {
        const playerData = await this.playerService.getPlayer(playerId);
        const gameData = await this.getGame(gameId);

        const player = PlayerMapper.toPlayerModel(playerData);
        const game = GameMapper.toGameModel(gameData);
        game.join(player);
        
        const updatedGameData = GameMapper.toGameData(game);
        const savedGameData = this.gameDao.saveGame(updatedGameData);
        return savedGameData;
    }
}