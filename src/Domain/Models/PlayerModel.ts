import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export interface IPlayer extends IAttacker, IDefender {
    isDead(): boolean;
    readonly name: string,
    readonly health: number,
    readonly email: string,
    readonly id?: number,
}

interface IAttacker {
    attack(): void;
}
interface IDefender {
    defend(): void;
}

export class PlayerModel implements IPlayer {
    public readonly health: number = 100;
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly id?: number,
    ) {

    }

    isDead(): boolean {
        return this.health === 0;
    }

    attack() {

    }
    defend() {

    }
}