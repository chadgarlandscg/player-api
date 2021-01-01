import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { GameType } from "./GameType";
import { Participant } from "./Participant";
import { Player } from "./Player";

@Entity()
export class MoveType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gameTypeId: number;
    @ManyToOne(type => GameType)
    gameType: GameType;

    @Column()
    name: string;

    @Column()
    displayName: string;
}
