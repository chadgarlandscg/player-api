import { Aggregate } from "../Models/Aggregate";

export interface IRepository<TAggregate> {
    get(id: number): Promise<TAggregate>;
    search(): Promise<TAggregate[]>;
    save(aggregate: TAggregate): Promise<TAggregate>;
}