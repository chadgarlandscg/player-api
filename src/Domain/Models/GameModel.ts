import { IPlayer } from "./PlayerModel";

export interface IGame {
    join(player: IPlayer): IGame;
    openSpots(): number;
    getPlayers(): IPlayer[];
    hasEnded(): boolean;
    readonly name: string;
    readonly capacity: number;
    readonly id?: number;
}

export class GameModel implements IGame {
    constructor(
        public readonly name: string,
        public readonly capacity: number,
        private readonly players: IPlayer[] = [],
        public readonly id?: number,
    ) {

    }

    hasEnded(): boolean {
        const deadPlayers = this.players.filter(p => p.isDead());
        return deadPlayers.length === this.players.length - 1;
    }

    join(player: IPlayer): IGame {
        if (this.players.length === this.capacity) {
            throw new Error("Game is already full.");
        }

        if (this.hasEnded()) {
            throw new Error("Game has already ended.");
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