import { IAggregate } from "../Models/IAggregate";

export interface IRepository<TAggregate extends IAggregate> {
    get(id: number): Promise<TAggregate>;
    search(): Promise<TAggregate[]>;
    save(aggregate: TAggregate): Promise<TAggregate>;
}