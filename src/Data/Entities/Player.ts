import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { IDataEntity } from "../../base/Data/IDataEntity";

@Entity()
export class Player implements IDataEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    code: string;
}