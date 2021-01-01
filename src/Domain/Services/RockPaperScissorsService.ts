import { inject, injectable } from "inversify";
import { Service } from "../../base/Services/Service";
import TYPES from "../../ioc/types";
import { GameType } from "../Models/ConcreteGameType";
import { Game, IGame } from "../Models/Game";
import { RockPaperScissors } from "../Models/RockPaperScissors/RockPaperScissors";
import { GameStatus } from "../Models/StandardTypes/GameStatus";
import { IGameRepository } from "../Repositories/IGameRepository";

export interface IRockPaperScissorsService {    
    createGame(lobbyName: string, lobbyCapacity: number, bestOf: number, gameType: GameType): RockPaperScissors;
}

@injectable()
export class RockPaperScissorsService implements IRockPaperScissorsService {
    constructor(
        @inject(TYPES.IGameRepository) private readonly gameRepository: IGameRepository) {
    }

    createGame(lobbyName: string, lobbyCapacity: number, bestOf: number, gameType: GameType): RockPaperScissors {
        if (!gameType.rockPaperScissors()) {
            throw new Error("Must be of type Rock Paper Scissors.");
        }
        return new RockPaperScissors({lobbyName, lobbyCapacity, bestOf, participants: [], status: GameStatus.Created, type: gameType});
    }
}