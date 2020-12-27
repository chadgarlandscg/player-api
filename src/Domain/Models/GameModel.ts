import { ConcreteGameType } from "./ConcreteGameType";

export interface IGame {
    readonly name: string;
    readonly gameType: string;
    readonly gameTypeId?: number;
    readonly id?: number;
}

export class GameModel implements IGame {
    public readonly gameType: string;
    public readonly gameTypeId?: number;
    constructor(
        public readonly name: string,
        options: {gameType: string, gameTypeId?: number},
        public readonly id?: number,
    ) {
        if (options.gameType)
            this.gameType = options.gameType;

        if (options.gameTypeId)
            this.gameTypeId = options.gameTypeId;
    }
}

export class RockPaperScissors extends GameModel {
    constructor(
        public readonly name: string,
        public readonly id?: number,
    ) {
        super(name, {gameType: ConcreteGameType[ConcreteGameType.RockPaperScissors]}, id)
    }
}