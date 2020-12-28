import { Request } from "express"
import { interfaces, controller, httpGet, httpPost, requestBody } from "inversify-express-utils"
import { inject } from "inversify";
import TYPES from "../ioc/types";
import { GameTypeView } from "./GameTypeView";
import { IGameTypeDataRepository } from "../Data/Repositories/IGameTypeDataRepository";

@controller("/game-types")
export class GameTypeController implements interfaces.Controller {
    @inject(TYPES.IGameTypeDataRepository) private readonly gameTypeRepository: IGameTypeDataRepository;

    @httpGet("/")
    async getTypes(): Promise<GameTypeView[]> {
        return this.gameTypeRepository.find();
    }
}