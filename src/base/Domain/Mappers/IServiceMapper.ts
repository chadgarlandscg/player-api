import { IDto } from "../../Services/IDto";
import { Aggregate, AggregateState } from "../Models/Aggregate";

export interface IServiceMapper<
    TDto extends IDto,
    TAggregate extends Aggregate<AggregateState>,
> {
    toDto<TExtraArg>(aggregate: TAggregate, arg?: TExtraArg): TDto;
}
