import { Game } from "../Data/Entities/Game";
import { IGameService } from "./IGameService";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";
import { IGameRepository } from "../Domain/Repositories/IGameRepository";
import { GameModel } from "../Domain/Models/GameModel";
import { IGameType } from "../Domain/Models/ConcreteGameType";
import { Service } from "../base/Services/Service";

@injectable()
export class GameService extends Service<GameModel> implements IGameService {
    constructor(@inject(TYPES.IGameRepository) private readonly gameRepository: IGameRepository) {
        super(gameRepository);
    }

    async createGame(name: string, gameType: IGameType): Promise<GameModel> {
        const newGame = this.gameRepository.createGame(name, gameType);
        const newlyRegisteredGame = await this.gameRepository.save(newGame);
        return newlyRegisteredGame;
    }
}