import { GameTypeStatus } from "../Domain/Models/StandardTypes/GameTypeStatus";
import { MoveTypeView } from "./MoveTypeView";

export class GameTypeView {
    id: number;
    name: string;
    description: string;
    displayName: string;
    minPlayers: number;
    maxPlayers: number;
    minRounds: number;
    maxRounds: number;
    moveTypes: MoveTypeView[];
    status: GameTypeStatus;
}