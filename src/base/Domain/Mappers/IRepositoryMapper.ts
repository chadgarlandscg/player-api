import { IDataEntity } from "../../Data/IDataEntity";
import { Aggregate, AggregateState } from "../Models/Aggregate";

export interface IRepositoryMapper<
    TDataEntity extends IDataEntity,
    TAggregate extends Aggregate<AggregateState>,
> {
    toData(aggregate: TAggregate): TDataEntity;
    toModel(dataEntity: TDataEntity, original?: TAggregate): TAggregate;
}
