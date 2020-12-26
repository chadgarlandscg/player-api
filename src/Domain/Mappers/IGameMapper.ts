import { IMapper } from "../../base/Domain/Mappers/IMapper";
import { GameView } from "../../Controllers/GameView";
import { Game } from "../../Data/Entities/Game";
import { GameModel } from "../Models/GameModel";

export interface IGameMapper extends IMapper<Game, GameModel, GameView> {

}