import { Game } from "../Data/Entities/Game";
import { IGameService } from "./IGameService";
import { IGameDao } from "../Data/IGameDao";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";
import { IGameRepository } from "../Domain/Repositories/IGameRepository";
import { IPlayerRepository } from "../Domain/Repositories/IPlayerRepository";
import { GameModel } from "../Domain/Models/GameModel";
import { GameTypeModel, IGameType } from "../Domain/Models/ConcreteGameType";

@injectable()
export class GameService implements IGameService {
    private readonly gameRepository: IGameRepository;

    constructor(@inject(TYPES.IGameRepository) gameRepository: IGameRepository) {
        this.gameRepository = gameRepository;
    }

    async searchGames(): Promise<GameModel[]> {
        const games = await this.gameRepository.searchGames();
        return games;
    }

    async getGame(id: number): Promise<GameModel> {
        const game = await this.gameRepository.getGame(id);
        if (!game) throw new Error("GameModel not found!");
        return game;
    }

    async createGame(name: string, gameType: IGameType): Promise<GameModel> {
        const newGame = this.gameRepository.createGame(name, gameType);
        const newlyRegisteredGame = await this.gameRepository.saveGame(newGame);
        return newlyRegisteredGame;
    }
}