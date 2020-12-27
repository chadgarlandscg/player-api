import { GameType } from "../../../Data/Entities/GameType";
import { ConcreteGameType } from "../ConcreteGameType";
import { ConcreteMoveType } from "../ConcreteMoveType";

export const gameTypes: GameType[] = [{
    displayName: "Rock, Paper, Scissors",
    name: ConcreteGameType[ConcreteGameType.RockPaperScissors],
    minPlayers: 2,
    maxPlayers: 6,
    minRounds: 1,
    maxRounds: 7,
    moveTypes: [{
        displayName: ConcreteMoveType[ConcreteMoveType.Rock],
        name: ConcreteMoveType[ConcreteMoveType.Rock]
    },{
        displayName: ConcreteMoveType[ConcreteMoveType.Paper],
        name: ConcreteMoveType[ConcreteMoveType.Paper]
    },{
        displayName: ConcreteMoveType[ConcreteMoveType.Scissors],
        name: ConcreteMoveType[ConcreteMoveType.Scissors]
    }]
}];