import { Repository } from "typeorm";
import { IDataEntity } from "./IDataEntity";

export interface IDataRepository<TDataEntity> extends Repository<TDataEntity> {
}