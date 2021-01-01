import { IDataEntity } from "./IDataEntity";

export interface IDao<TDataEntity extends IDataEntity> {
    get(id: number): Promise<TDataEntity | undefined>;
    search(): Promise<TDataEntity[]>;
    save(dataEntity: TDataEntity): Promise<TDataEntity>;
}