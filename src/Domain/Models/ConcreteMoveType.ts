export enum ConcreteMoveType {
    Rock,
    Paper,
    Scissors
}

export class MoveType {
    public readonly id: number;
    public readonly name: string;
    public readonly type?: ConcreteMoveType;
    public readonly displayName: string;
    constructor(id: number, name: string, displayName: string) {
        this.type = ConcreteMoveType[name as keyof typeof ConcreteMoveType];
        this.id = id;
        this.name = name;
        this.displayName = displayName;
    }
}
