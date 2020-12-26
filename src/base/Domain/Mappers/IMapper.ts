import { IView } from "../../Controllers/IView";
import { IDataEntity } from "../../Data/IDataEntity";
import { IAggregate } from "../Models/IAggregate";
import { IRepositoryMapper } from "./IRepositoryMapper";
import { IViewMapper } from "./IViewMapper";

export interface IMapper<
    TDataEntity extends IDataEntity,
    TAggregate extends IAggregate,
    TView extends IView
> extends IViewMapper<TView>, IRepositoryMapper<TDataEntity, TAggregate> {
    
}
