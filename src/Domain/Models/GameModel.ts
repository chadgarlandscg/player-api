import { ConcreteGameType, GameTypeModel, RockPaperScissorsType } from "./ConcreteGameType";

export interface IGame {
    readonly name: string;
    readonly gameType: GameTypeModel;
    readonly id?: number;
}

export class GameModel implements IGame {
    constructor(
        public readonly gameType: GameTypeModel,
        public readonly name: string,
        public readonly id?: number,
    ) {

    }
}

export class RockPaperScissors extends GameModel {
    constructor(
        public readonly gameTypeId: number,
        public readonly name: string,
        public readonly id?: number,
    ) {
        super(new RockPaperScissorsType(gameTypeId), name, id)
    }
}