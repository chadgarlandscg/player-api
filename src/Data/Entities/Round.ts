import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { GameType } from "./GameType";
import { Move } from "./Move";
import { Participant } from "./Participant";
import { Player } from "./Player";

@Entity()
export class Round {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable: true})
    tieRoundId?: number;
    @OneToOne(type => Round)
    tieRound?: Round;

    @OneToMany(type => Move, move => move.round)
    moves: Move[];
}