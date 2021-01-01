import { Entity, Identifiable } from './Entity';

export class AggregateState implements Identifiable {
    public validate(): void {
        return;
    }
    public readonly id: number;
    constructor(id?: number) {
        if (id) {
            this.id = id;
        }
    }
}

export class Aggregate<TState extends AggregateState> extends Entity {
    protected state: TState;
    constructor(
        props: TState
    ) {
        super(props.id);
        this.state = props;
        this.state.validate();
    }
}