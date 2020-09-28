import { IPlayer } from "./PlayerModel";

export interface IGame {
    join(player: IPlayer): IGame;
    openSpots(): number;
}

export class GameModel implements IGame {
    constructor(
        public readonly name: string,
        public readonly capacity: number,
        private readonly players: IPlayer[] = [],
        public readonly id?: number,
    ) {

    }

    join(player: IPlayer): IGame {
        if (this.players.length === this.capacity) {
            throw new Error("Game is already full.");
        }
        this.players.push(player);
        return this;
    }

    openSpots(): number {
        return this.capacity - this.players.length;
    }

    getPlayers(): IPlayer[] {
        return [...this.players];
    }
}