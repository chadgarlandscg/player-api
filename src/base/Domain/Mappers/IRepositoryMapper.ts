import { IView } from "../../Controllers/IView";
import { IDataEntity } from "../../Data/IDataEntity";
import { Aggregate } from "../Models/Aggregate";

export interface IRepositoryMapper<
    TDataEntity extends IDataEntity,
    TAggregate extends Aggregate<TDataEntity>,
> {
    toData(aggregate: TAggregate): TDataEntity;
    toModel(dataEntity: TDataEntity): TAggregate;
}
