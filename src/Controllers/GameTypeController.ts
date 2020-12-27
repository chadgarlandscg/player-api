import { Request } from "express"
import { interfaces, controller, httpGet, httpPost, requestBody } from "inversify-express-utils"
import { inject } from "inversify";
import TYPES from "../ioc/types";
import { GameTypeView } from "./GameTypeView";
import { IGameTypeRepository } from "../Data/Repositories/IGameTypeRepository";

@controller("/games")
export class GameTypeController implements interfaces.Controller {
    @inject(TYPES.IGameTypeRepository) private readonly gameTypeRepository: IGameTypeRepository;

    @httpGet("/types")
    async getTypes(): Promise<GameTypeView[]> {
        return this.gameTypeRepository.find();
    }
}