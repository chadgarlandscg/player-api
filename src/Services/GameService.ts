import { IGameService } from "./IGameService";
import { injectable, inject } from "inversify";
import TYPES from "../ioc/types";
import { IGameRepository } from "../Domain/Repositories/IGameRepository";
import { Game, IGame } from "../Domain/Models/Game";
import { Service } from "../base/Services/Service";
import { GameTypeView } from "../Controllers/GameTypeView";

@injectable()
export class GameService extends Service<IGame, Game> implements IGameService {
    constructor(
        @inject(TYPES.IGameRepository) private readonly gameRepository: IGameRepository) {
        super(gameRepository);
    }

    async createGame(lobbyName: string, lobbyCapacity: number, gameTypeId: number): Promise<Game> {
        const newGame = await this.gameRepository.createGameLobby(lobbyName, lobbyCapacity, gameTypeId);
        const savedGame = await this.gameRepository.save(newGame);
        return savedGame;
    }
}