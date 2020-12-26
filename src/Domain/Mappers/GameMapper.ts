import { GameView } from "../../Controllers/GameView";
import { Game } from "../../Data/Entities/Game";
import { ConcreteGameType, GameTypeModel, RockPaperScissorsType } from "../Models/ConcreteGameType";
import { GameModel, IGame, RockPaperScissors } from "../Models/GameModel";
import { PlayerMapper } from "./PlayerMapper";

export class GameMapper {
    static toGameModel(game: Game): GameModel {
        switch (game.type?.name) {
            case ConcreteGameType.RockPaperScissors.toString():
                return new RockPaperScissors(game.type?.id, game.name, game.id)   
            default:
                return new GameModel(new GameTypeModel(game.type?.name, game.type?.id), game.name, game.id);
        }
    }
    static toGameData(gameModel: GameModel): Game {
        const game = new Game();
        game.name = gameModel.name;
        game.gameTypeId = gameModel.gameType.id;
        if (!!gameModel.id) {
            game.id = gameModel.id;
        }

        return game;
    }
    static toGameView(gameModel: IGame): GameView {
        const gameView = new GameView();
        gameView.name = gameModel.name;
        gameView.gameType = gameModel.gameType?.name;
        if (!!gameModel.id) {
            gameView.id = gameModel.id;
        }

        return gameView;
    }
}
