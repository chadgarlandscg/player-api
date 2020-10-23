import { GameDao } from "../Data/GameDao";
import { Game } from "../Data/Entities/Game";
import { IGameService } from "./IGameService";
import { IGameDao } from "../Data/IGameDao";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";
import { GameMapper } from "../Domain/Mappers/GameMapper";
import { PlayerMapper } from "../Domain/Mappers/PlayerMapper";
import { IGameRepository } from "../Domain/Repositories/IGameRepository";
import { IPlayerRepository } from "../Domain/Repositories/IPlayerRepository";
import { GameView } from "../Controllers/GameView";

@injectable()
export class GameService implements IGameService {
    private readonly gameDao: IGameDao;
    private readonly gameRepository: IGameRepository;
    private readonly playerRepository: IPlayerRepository;

    constructor(@inject(TYPES.IGameDao) gameDao: IGameDao, @inject(TYPES.IGameRepository) gameRepository: IGameRepository, @inject(TYPES.IPlayerRepository) playerRepository: IPlayerRepository) {
        this.gameDao = gameDao;
        this.gameRepository = gameRepository;
        this.playerRepository = playerRepository;
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

    async joinGame(gameId: number, playerId: number): Promise<GameView> {
        const player = await this.playerRepository.getPlayer(playerId);
        const game = await this.gameRepository.getGame(playerId);
        
        game.join(player);
        
        const savedGame = await this.gameRepository.saveGame(game);

        return GameMapper.toGameView(savedGame);
    }
}