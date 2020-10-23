import { Game } from "./Entities/Game";
import { getRepository, Repository } from "typeorm";
import { IGameDao } from "./IGameDao";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";

@injectable()
export class GameDao implements IGameDao {
    private readonly gameDataRepository: Repository<Game>;
    
    constructor(@inject(TYPES.IGameDataRepository) gameDataRepository: Repository<Game>) {
        this.gameDataRepository = gameDataRepository;
    }

    async getGame(id: number): Promise<Game | undefined> {
        const game = await this.gameDataRepository.findOne(id);
        return game;
    }

    async searchGames(): Promise<Game[]> {
        const games = await this.gameDataRepository.find();
        return games;
    }

    async saveGame(game: Game): Promise<Game> {
        const savedGame = await this.gameDataRepository.save(game);
        return savedGame;
    }
}