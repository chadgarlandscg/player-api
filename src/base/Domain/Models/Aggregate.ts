import { Entity } from './Entity';

export class AggregateState {
    id?: number;
}

export class Aggregate<TState extends AggregateState> extends Entity {
    state: AggregateState;
    constructor(
        props: TState
    ) {
        super(props.id);
    }
}