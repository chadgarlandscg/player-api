import { GameDao } from "../Data/GameDao";
import { Game } from "../Data/Entities/Game";
import { IGameService } from "./IGameService";
import { IGameDao } from "../Data/IGameDao";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";
import { GameModel } from "./Models/GameModel";
import { Player } from "../Data/Entities/Player";
import { PlayerModel } from "./Models/PlayerModel";
import { IPlayerService } from "./IPlayerService";

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

class GameMapper {
    static toGameModel(game: Game): GameModel {
        const gameModel = new GameModel(game.name, game.capacity, game.players?.map(PlayerMapper.toPlayerModel), game.id);
        return gameModel;
    }
    static toGameData(gameModel: GameModel): Game {
        const game = new Game();
        game.name = gameModel.name;
        game.capacity = gameModel.capacity;
        game.players = gameModel.getPlayers().map(PlayerMapper.toPlayerData);

        if (!!gameModel.id) {
            game.id = gameModel.id;
        }

        return game;
    }
}

class PlayerMapper {
    static toPlayerModel(player: Player): PlayerModel {
        const playerModel = new PlayerModel(player.name, player.email, player.id);
        return playerModel;
    }
    static toPlayerData(playerModel: PlayerModel): Player {
        const player = new Player();
        player.name = playerModel.name;
        player.email = playerModel.email;
        if (!!playerModel.id) {
            player.id = playerModel.id;
        }

        return player;
    }
}