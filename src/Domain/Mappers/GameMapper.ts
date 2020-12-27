import { injectable } from "inversify";
import { GameView } from "../../Controllers/GameView";
import * as DataEntities from "../../Data/Entities";
import { ConcreteGameType } from "../Models/ConcreteGameType";
import { Game, IGame, RockPaperScissors } from "../Models/Game";
import { gameTypes } from "../Models/StandardTypes/GameTypes";
import { IGameMapper } from "./IGameMapper";

@injectable()
export class GameMapper implements IGameMapper {
    toModel(game: DataEntities.Game): Game {
        switch (game.type?.name) {
            case ConcreteGameType.RockPaperScissors.toString():
                return new RockPaperScissors({...game})   
            default:
                return new Game({...game, gameType: game.type.name}, {gameTypeId: game.type.id, gameType: game.type.name});
        }
    }
    toData(gameModel: Game): DataEntities.Game {
        const game = new DataEntities.Game();
        game.lobbyName = gameModel.lobbyName;
        game.gameTypeId = gameModel.gameTypeId || 0;
        if (!!gameModel.id) {
            game.id = gameModel.id;
        }

        return game;
    }
    toView(gameModel: IGame): GameView {
        const gameView = new GameView();
        gameView.name = gameModel.lobbyName;
        gameView.gameType = gameModel.gameType;
        if (!!gameModel.id) {
            gameView.id = gameModel.id;
        }

        return gameView;
    }
}
