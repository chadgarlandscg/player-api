import { injectable } from "inversify";
import { GameView } from "../../Controllers/GameView";
import * as DataEntities from "../../Data/Entities";
import { DomainError } from "../Errors/DomainError";
import { ConcreteGameType } from "../Models/ConcreteGameType";
import { Game, IGame } from "../Models/Game";
import { RockPaperScissors } from "../Models/RockPaperScissors/RockPaperScissors";
import { gameTypes } from "../Models/StandardTypes/GameTypes";
import { IGameMapper } from "./IGameMapper";

@injectable()
export class GameMapper implements IGameMapper {
    toModel(game: DataEntities.Game): Game {
        switch (game.type?.name) {
            case ConcreteGameType.RockPaperScissors.toString():
                return new RockPaperScissors({...game, type: game.type})   
            default:
                throw new DomainError("Game type not supported!");
        }
    }
    toData(gameModel: Game): DataEntities.Game {
        const game = new DataEntities.Game();
        game.lobbyName = gameModel.lobbyName;
        game.gameTypeId = gameModel.type.id;
        if (!!gameModel.id) {
            game.id = gameModel.id;
        }

        return game;
    }
    toView(gameModel: IGame): GameView {
        const gameView = new GameView();
        gameView.name = gameModel.lobbyName;
        gameView.gameType = gameModel.type.name;
        if (!!gameModel.id) {
            gameView.id = gameModel.id;
        }

        return gameView;
    }
}
