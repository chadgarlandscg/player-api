import { Repository } from "typeorm";
import { IDao } from "./IDao";
import { IDataEntity } from "./IDataEntity";

export abstract class TypeOrmDao<TDataEntity extends IDataEntity> implements IDao<TDataEntity> {
    private readonly dataRepository: Repository<TDataEntity>;
    
    constructor(dataRepository: Repository<TDataEntity>) {
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
        const saved = await this.dataRepository.save(dataEntity);
        return saved;
    }
}