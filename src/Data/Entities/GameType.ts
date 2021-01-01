import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { GameTypeStatus } from "../../Domain/Models/StandardTypes/GameTypeStatus";
import { MoveType } from "./MoveType";

@Entity()
export class GameType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    displayName: string;

    @Column()
    description: string;

    @Column()
    minPlayers: number;

    @Column()
    maxPlayers: number;

    @Column()
    minRounds: number;

    @Column()
    maxRounds: number;

    @OneToMany(type => MoveType, moveType => moveType.gameType, {cascade: true, eager: true})
    moveTypes: MoveType[];

    @Column({
        type: "enum",
        enum: GameTypeStatus,
        default: GameTypeStatus.ComingSoon
    })
    status: GameTypeStatus
}