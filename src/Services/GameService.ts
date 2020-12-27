import { IGameService } from "./IGameService";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";
import { IGameRepository } from "../Domain/Repositories/IGameRepository";
import { Game, IGame } from "../Domain/Models/Game";
import { IGameType } from "../Domain/Models/ConcreteGameType";
import { Service } from "../base/Services/Service";

@injectable()
export class GameService extends Service<IGame, Game> implements IGameService {
    constructor(@inject(TYPES.IGameRepository) private readonly gameRepository: IGameRepository) {
        super(gameRepository);
    }

    async createGame(lobbyName: string, lobbyCapacity: number, gameType: IGameType): Promise<Game> {
        const newGame = this.gameRepository.createGame(lobbyName, lobbyCapacity, gameType);
        const newlyRegisteredGame = await this.gameRepository.save(newGame);
        return newlyRegisteredGame;
    }
}