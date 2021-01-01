import { IDataEntity } from "../../Data/IDataEntity";
import { Aggregate } from "../Models/Aggregate";

export interface IRepository<TAggregate extends Aggregate<IDataEntity>> {
    get(id: number): Promise<TAggregate>;
    search(): Promise<TAggregate[]>;
    save(aggregate: TAggregate): Promise<TAggregate>;
}