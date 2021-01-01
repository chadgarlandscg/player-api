import { IRepositoryMapper } from "../../base/Domain/Mappers/IRepositoryMapper";
import { IServiceMapper } from "../../base/Domain/Mappers/IServiceMapper";
import { IViewMapper } from "../../base/Domain/Mappers/IViewMapper";
import { GameView } from "../../Controllers/GameView";
import { GameData } from "../../Data/Entities";
import { Game, IGame } from "../Models/Game";

export interface IGameRepositoryMapper extends IRepositoryMapper<GameData, Game> {
}

export interface IGameViewMapper extends IViewMapper<IGame, GameView> {
}

export interface IGameServiceMapper extends IServiceMapper<IGame, Game> {
    toDto<GameType>(game: Game, gameType: GameType): IGame;
}