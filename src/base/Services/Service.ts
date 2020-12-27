import { injectable } from "inversify";
import { Aggregate } from "../Domain/Models/Aggregate";
import { IRepository } from "../Domain/Repositories/IRepository";
import { IService } from "./IService";

@injectable()
export class Service<TAggregate extends Aggregate> implements IService<TAggregate> {
    private readonly repository: IRepository<TAggregate>;

    constructor(repository: IRepository<TAggregate>) {
        this.repository = repository;
    }

    async search(): Promise<TAggregate[]> {
        const results = await this.repository.search();
        return results;
    }

    async get(id: number): Promise<TAggregate> {
        const aggregate = await this.repository.get(id);
        if (!aggregate) throw new Error("Aggregate not found!");
        return aggregate;
    }

    private async save(aggregate: TAggregate): Promise<TAggregate> {
        const newlyRegistered = await this.repository.save(aggregate);
        return newlyRegistered;
    }
}