import { injectable } from "inversify";
import { FindConditions } from "typeorm";
import { IDao } from "./IDao";
import { IDataEntity } from "./IDataEntity";
import { IDataRepository } from "./IDataRepository";

@injectable()
export class Dao<TDataEntity extends IDataEntity> implements IDao<TDataEntity> {  
    constructor(private readonly dataRepository: IDataRepository<TDataEntity>) {
    }

    async get(id: number): Promise<TDataEntity | undefined> {
        const dataEntity = await this.dataRepository.find({where: {id}});
        return dataEntity[0];
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