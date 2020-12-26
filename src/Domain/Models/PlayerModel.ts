export interface IPlayer {
    readonly username: string;
    readonly code: string;
    readonly id?: number;
}

export class PlayerModel implements IPlayer {
    constructor(
        public readonly username: string,
        public readonly code: string,
        public readonly id?: number,
    ) {

    }
}