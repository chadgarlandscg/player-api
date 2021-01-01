import { injectable } from "inversify";
import { IServiceMapper } from "../Domain/Mappers/IServiceMapper";
import { Aggregate, AggregateState } from "../Domain/Models/Aggregate";
import { IRepository } from "../Domain/Repositories/IRepository";
import { IDto } from "./IDto";
import { IService } from "./IService";

@injectable()
export class Service<TDto extends IDto, TAggregate extends Aggregate<AggregateState>> implements IService<TDto> {
    private readonly repository: IRepository<TAggregate>;
    private readonly mapper: IServiceMapper<TDto, TAggregate>;

    constructor(repository: IRepository<TAggregate>, mapper: IServiceMapper<TDto, TAggregate>) {
        this.repository = repository;
        this.mapper = mapper;
    }

    async search(): Promise<TDto[]> {
        const results = await this.repository.search();
        return results.map(this.mapper.toDto);
    }

    async get(id: number): Promise<TDto> {
        const aggregate = await this.repository.get(id);
        if (!aggregate) throw new Error("Aggregate not found!");
        return this.mapper.toDto(aggregate);
    }

    protected async save(aggregate: TAggregate): Promise<TDto> {
        const newlyRegistered = await this.repository.save(aggregate);
        return this.mapper.toDto(newlyRegistered);
    }
}