import { GameDao } from "../Data/GameDao";
import { Game } from "../Data/Entities/Game";

export interface IGameService {
    searchGames(): Promise<Game[]>;
    getGame(id: number): Promise<Game>;
    createGame(name: string, capacity: number): Promise<Game>;
    joinGame(gameId: number, playerId: number): Promise<Game>;
}