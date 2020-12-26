import { Router, Application, Response, RequestHandler, Request } from "express"
import { interfaces, controller, httpGet, httpPost, requestBody } from "inversify-express-utils"
import { IView } from "./IView";
import { IViewMapper } from "../Domain/Mappers/IViewMapper";
import { IService } from "../Services/IService";
import { IDto } from "../Services/IDto";


export class InversifyController<TView extends IView, TDto extends IDto> implements interfaces.Controller {
    private readonly service: IService<TDto>;
    private readonly mapper: IViewMapper<TView>;

    constructor(service: IService<TDto>, mapper: IViewMapper<TView>) {
        this.service = service;
        this.mapper = mapper;
    }

    async search(): Promise<TView[]> {
        const games = await this.service.search();
        return games.map(this.mapper.toView);
    }

    async get(request: Request): Promise<TView> {
        const game = await this.service.get(+request.params.id);
        return this.mapper.toView(game);
    }
}