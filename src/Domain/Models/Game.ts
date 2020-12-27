import { Aggregate } from "../../base/Domain/Models/Aggregate";
import { IDto } from "../../base/Services/IDto";
import { ConcreteGameType } from "./ConcreteGameType";

export interface IGame extends IDto {
    readonly name: string;
    readonly gameType: string;
    readonly gameTypeId?: number;
    readonly id: number;
}

export class Game extends Aggregate implements IGame {
    public readonly gameType: string;
    public readonly id: number;
    public readonly gameTypeId?: number;
    constructor(
        public readonly name: string,
        options: {gameType: string, gameTypeId?: number},
        id?: number,
    ) {
        super(id);
        if (options.gameType)
            this.gameType = options.gameType;

        if (options.gameTypeId)
            this.gameTypeId = options.gameTypeId;
    }
}

export class RockPaperScissors extends Game {
    constructor(
        public readonly name: string,
        id?: number,
    ) {
        super(name, {gameType: ConcreteGameType[ConcreteGameType.RockPaperScissors]}, id)
    }
}