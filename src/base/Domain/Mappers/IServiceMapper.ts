import { IDto } from "../../Services/IDto";
import { IAggregate } from "../Models/IAggregate";

export interface IServiceMapper<
    TDto extends IDto,
    TAggregate extends IAggregate,
> {
    toDto(aggregate: TAggregate): TDto;
}
