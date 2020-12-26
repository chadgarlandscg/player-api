import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Participant } from "./Participant";

@Entity()
export class Lobby {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gameId: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @OneToMany(type => Participant, participant => participant.lobby)
    participants: Participant[];
}