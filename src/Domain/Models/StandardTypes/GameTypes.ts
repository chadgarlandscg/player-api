import { GameType } from "../../../Data/Entities/GameType";
import { ConcreteGameType } from "../ConcreteGameType";
import { ConcreteMoveType } from "../ConcreteMoveType";
import { GameTypeStatus } from "./GameTypeStatus";

export const gameTypes: GameType[] = [{
    displayName: "Rock, Paper, Scissors",
    description: "The classic game where hard beats pointy, pointy beats flimsy, and flimsy beats hard. May the lucky survive!",
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
    }],
    status: GameTypeStatus.Active
},{
    displayName: "API Wars",
    description: "Duel your friends and foes, one request at a time! Spend coins, wield weapons, and drink potions to win!",
    name: ConcreteGameType[ConcreteGameType.ApiWars],
    minPlayers: 3,
    maxPlayers: 10,
    minRounds: 1,
    maxRounds: 1,
    moveTypes: [],
    status: GameTypeStatus.ComingSoon
}];