import { Game } from "./Entities/Game";
import { getRepository, Repository } from "typeorm";
import { IGameDao } from "./IGameDao";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";

@injectable()
export class GameDao implements IGameDao {
    private readonly gameRepository: Repository<Game>;
    
    constructor(@inject(TYPES.IGameRepository) gameRepository: Repository<Game>) {
        this.gameRepository = gameRepository;
    }

    async getGame(id: number): Promise<Game | undefined> {
        const game = await this.gameRepository.findOne(id);
        return game;
    }

    async searchGames(): Promise<Game[]> {
        const games = await this.gameRepository.find();
        return games;
    }

    async saveGame(game: Game): Promise<Game> {
        const savedGame = await this.gameRepository.save(game);
        return savedGame;
    }
}