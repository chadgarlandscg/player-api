import { DeepPartial } from "typeorm";
import { IView } from "../../Controllers/IView";
import { IDataEntity } from "../../Data/IDataEntity";
import { Aggregate } from "../Models/Aggregate";

export interface IRepositoryMapper<
    TDataEntity extends IDataEntity,
    TAggregate extends Aggregate<DeepPartial<TDataEntity>>,
> {
    toData(aggregate: TAggregate): TDataEntity;
    toModel(dataEntity: TDataEntity): TAggregate;
}
