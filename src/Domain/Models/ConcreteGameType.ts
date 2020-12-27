export enum ConcreteGameType {
    RockPaperScissors,
    ApiWars
}

export interface IGameType {
    readonly type?: ConcreteGameType;
    readonly name: string;
    readonly id: number;
}

export class GameTypeModel implements IGameType {
    public readonly type?: ConcreteGameType
    constructor(public readonly name: string, public readonly id: number) {
        this.type = ConcreteGameType[name as keyof typeof ConcreteGameType];
    }
}

export class RockPaperScissorsType extends GameTypeModel {
    constructor(id: number) {
        super(ConcreteGameType.RockPaperScissors.toString(), id);
    } 
}