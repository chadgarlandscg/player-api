import { IMapper } from "../../base/Domain/Mappers/IMapper";
import { GameView } from "../../Controllers/GameView";
import * as DataEntities from "../../Data/Entities";
import { Game } from "../Models/Game";

export interface IGameMapper extends IMapper<DataEntities.Game, Game, GameView> {

}