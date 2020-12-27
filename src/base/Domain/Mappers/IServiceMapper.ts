import { IDto } from "../../Services/IDto";
import { Aggregate } from "../Models/Aggregate";

export interface IServiceMapper<
    TDto extends IDto,
    TAggregate extends Aggregate,
> {
    toDto(aggregate: TAggregate): TDto;
}
