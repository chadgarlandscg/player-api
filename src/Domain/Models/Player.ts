export interface IPlayer {
    readonly username: string;
    readonly code: string;
    readonly id: number;
}

export class Player implements IPlayer {
    public readonly id: number;
    constructor(
        public readonly username: string,
        public readonly code: string,
        id?: number,
    ) {
        if (id) {
            this.id = id;
        }
    }
}