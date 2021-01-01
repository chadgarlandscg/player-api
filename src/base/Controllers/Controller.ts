import { Request } from "express"
import { interfaces } from "inversify-express-utils"
import { IView } from "./IView";
import { IViewMapper } from "../Domain/Mappers/IViewMapper";
import { IService } from "../Services/IService";
import { IDto } from "../Services/IDto";
import { injectable } from "inversify";

@injectable()
export class Controller<TView extends IView, TDto extends IDto> implements interfaces.Controller {
    private readonly service: IService<TDto>;
    private readonly mapper: IViewMapper<TDto, TView>;

    constructor(service: IService<TDto>, mapper: IViewMapper<TDto, TView>) {
        this.service = service;
        this.mapper = mapper;
    }

    async search(): Promise<TView[]> {
        const dtos = await this.service.search();
        return dtos.map(this.mapper.toView);
    }

    async get(request: Request): Promise<TView> {
        const dto = await this.service.get(+request.params.id);
        return this.mapper.toView(dto);
    }
}