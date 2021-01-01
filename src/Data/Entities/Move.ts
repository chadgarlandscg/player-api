import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { GameType } from "./GameType";
import { Participant } from "./Participant";
import { Player } from "./Player";
import { Round } from "./Round";

@Entity()
export class Move {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roundId: number;
    @ManyToOne(type => Round)
    round: Round;

    @Column()
    gameTypeId: number;
    @ManyToOne(type => GameType)
    gameType: GameType;
}