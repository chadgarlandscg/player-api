import { IDataEntity } from "../../Data/IDataEntity";
import { Aggregate, AggregateState } from "../Models/Aggregate";

export interface IRepository<TAggregate extends Aggregate<AggregateState>> {
    get(id: number): Promise<TAggregate>;
    search(): Promise<TAggregate[]>;
    save(aggregate: TAggregate): Promise<TAggregate>;
}