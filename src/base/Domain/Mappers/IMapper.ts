import { IView } from "../../Controllers/IView";
import { IDataEntity } from "../../Data/IDataEntity";
import { Aggregate } from "../Models/Aggregate";
import { IRepositoryMapper } from "./IRepositoryMapper";
import { IViewMapper } from "./IViewMapper";

export interface IMapper<
    TDataEntity extends IDataEntity,
    TAggregate extends Aggregate<DeepPartial<TDataEntity>>,
    TView extends IView
> extends IViewMapper<TView>, IRepositoryMapper<TDataEntity, TAggregate> {
    
}
