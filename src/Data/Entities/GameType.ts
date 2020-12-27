import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MoveType } from "./MoveType";

@Entity()
export class GameType {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    displayName: string;

    @Column()
    minPlayers: number;

    @Column()
    maxPlayers: number;

    @Column()
    minRounds: number;

    @Column()
    maxRounds: number;

    @OneToMany(type => MoveType, moveType => moveType.gameType, {cascade: true})
    moveTypes: MoveType[];
}