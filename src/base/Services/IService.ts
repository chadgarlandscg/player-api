import { IDto } from "./IDto";

export interface IService<TDto extends IDto> {
    search(): Promise<TDto[]>;
    get(id: number): Promise<TDto>;
}