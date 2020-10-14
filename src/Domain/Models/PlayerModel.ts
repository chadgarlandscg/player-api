import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export interface IPlayer extends IAttacker, IDefender {
    readonly name: string,
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
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly id?: number,
    ) {

    }

    attack() {

    }
    defend() {

    }
}