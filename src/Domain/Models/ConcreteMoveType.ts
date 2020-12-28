export enum ConcreteMoveType {
    Rock,
    Paper,
    Scissors
}

export class MoveType {
    public readonly id?: number;
    public readonly name: string;
    public readonly type?: ConcreteMoveType;
    constructor(id: number, name: string) {
        this.type = ConcreteMoveType[name as keyof typeof ConcreteMoveType];
        this.id = id;
        this.name = name;
    }
}
