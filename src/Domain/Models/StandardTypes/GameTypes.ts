import { GameType } from "../../../Data/Entities/GameType";
import { MoveType } from "../../../Data/Entities/MoveType";
import { ConcreteGameType } from "../ConcreteGameType";
import { ConcreteMoveType } from "../ConcreteMoveType";
import { GameTypeStatus } from "./GameTypeStatus";

const rockPaperScissors = new GameType();
rockPaperScissors.displayName = "Rock, Paper, Scissors";
rockPaperScissors.description = "The classic game where hard beats pointy, pointy beats flimsy, and flimsy beats hard. May the lucky survive!";
rockPaperScissors.name = ConcreteGameType[ConcreteGameType.RockPaperScissors];
rockPaperScissors.minPlayers = 2;
rockPaperScissors.maxPlayers = 6;
rockPaperScissors.minRounds = 1;
rockPaperScissors.maxRounds = 7;
const rock = new MoveType();
rock.displayName = ConcreteMoveType[ConcreteMoveType.Rock];
rock.name = ConcreteMoveType[ConcreteMoveType.Rock];
const paper = new MoveType();
paper.displayName = ConcreteMoveType[ConcreteMoveType.Paper];
paper.name = ConcreteMoveType[ConcreteMoveType.Paper];
const scissors = new MoveType();
scissors.displayName = ConcreteMoveType[ConcreteMoveType.Scissors];
scissors.name = ConcreteMoveType[ConcreteMoveType.Scissors];
rockPaperScissors.moveTypes = [rock, paper, scissors];

const apiWars = new GameType();
apiWars.displayName = "API Wars";
apiWars.description = "Duel your friends and foes, one request at a time! Spend coins, wield weapons, and drink potions to win!";
apiWars.name = ConcreteGameType[ConcreteGameType.ApiWars];
apiWars.minPlayers = 3;
apiWars.maxPlayers = 10;
apiWars.minRounds = 1;
apiWars.maxRounds = 1;
apiWars.moveTypes = [];
apiWars.status = GameTypeStatus.ComingSoon;

export const gameTypes: GameType[] = [rockPaperScissors, apiWars];