import { IView } from "../../Controllers/IView";
import { IDataEntity } from "../../Data/IDataEntity";
import { IAggregate } from "../Models/IAggregate";

export interface IRepositoryMapper<
    TDataEntity extends IDataEntity,
    TAggregate extends IAggregate,
> {
    toData(aggregate: TAggregate): TDataEntity;
    toModel(dataEntity: TDataEntity): TAggregate;
}
