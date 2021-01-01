import { injectable } from "inversify";
import { IDao } from "../../Data/IDao";
import { IDataEntity } from "../../Data/IDataEntity";
import { IRepositoryMapper } from "../Mappers/IRepositoryMapper";
import { Aggregate, AggregateState } from "../Models/Aggregate";
import { IRepository } from "./IRepository";

@injectable()
export abstract class Repository<TAggregate extends Aggregate<AggregateState>, TDataEntity extends IDataEntity> implements IRepository<TAggregate> {
    protected readonly dao: IDao<TDataEntity>;
    protected readonly mapper: IRepositoryMapper<TDataEntity, TAggregate>;
     
    constructor(dao: IDao<TDataEntity>, mapper: IRepositoryMapper<TDataEntity, TAggregate>) {
        this.dao = dao;
        this.mapper = mapper;
    }

    async get(id: number): Promise<TAggregate> {
        const data = await this.dao.get(id);
        if (!data) throw new Error("Aggregate not found!");
        const aggregate = this.mapper.toModel(data);
        return aggregate;
    }

    async search(): Promise<TAggregate[]> {
        const results = await this.dao.search();
        const aggregates = results.map(r => this.mapper.toModel(r))
        return aggregates;
    }

    async save(aggregate: TAggregate): Promise<TAggregate> {
        const data = this.mapper.toData(aggregate);
        const savedData = await this.dao.save(data);
        const savedAggregate = this.mapper.toModel(savedData, aggregate);
        return savedAggregate;
    }
}