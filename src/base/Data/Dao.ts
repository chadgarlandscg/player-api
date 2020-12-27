import { injectable } from "inversify";
import { IDao } from "./IDao";
import { IDataEntity } from "./IDataEntity";
import { IDataRepository } from "./IDataRepository";

@injectable()
export class Dao<TDataEntity extends IDataEntity> implements IDao<TDataEntity> {
    private readonly dataRepository: IDataRepository<TDataEntity>;
    
    constructor(dataRepository: IDataRepository<TDataEntity>) {
        this.dataRepository = dataRepository;
    }

    async get(id: number): Promise<TDataEntity | undefined> {
        const dataEntity = await this.dataRepository.findOne(id);
        return dataEntity;
    }

    async search(): Promise<TDataEntity[]> {
        const entities = await this.dataRepository.find();
        return entities;
    }

    async save(dataEntity: TDataEntity): Promise<TDataEntity> {
        const saved = await this.dataRepository.save(dataEntity as any);
        return saved;
    }
}