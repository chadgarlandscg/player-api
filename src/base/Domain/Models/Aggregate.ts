import { Entity, Identifiable } from './Entity';

export class AggregateState implements Identifiable {
    public readonly id?: number;
}

export class Aggregate<TState extends AggregateState> extends Entity {
    state: AggregateState;
    constructor(
        props: TState
    ) {
        super(props.id);
    }
}