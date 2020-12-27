import { injectable } from "inversify";
import { GameView } from "../../Controllers/GameView";
import { Game } from "../../Data/Entities/Game";
import { ConcreteGameType } from "../Models/ConcreteGameType";
import { GameModel, IGame, RockPaperScissors } from "../Models/GameModel";
import { IGameMapper } from "./IGameMapper";

@injectable()
export class GameMapper implements IGameMapper {
    toModel(game: Game): GameModel {
        switch (game.type?.name) {
            case ConcreteGameType.RockPaperScissors.toString():
                return new RockPaperScissors(game.lobbyName, game.id)   
            default:
                return new GameModel(game.lobbyName, {gameTypeId: game.type.id, gameType: game.type.name}, game.id);
        }
    }
    toData(gameModel: GameModel): Game {
        const game = new Game();
        game.lobbyName = gameModel.name;
        game.gameTypeId = gameModel.gameTypeId || 0;
        if (!!gameModel.id) {
            game.id = gameModel.id;
        }

        return game;
    }
    toView(gameModel: IGame): GameView {
        const gameView = new GameView();
        gameView.name = gameModel.name;
        gameView.gameType = gameModel.gameType;
        if (!!gameModel.id) {
            gameView.id = gameModel.id;
        }

        return gameView;
    }
}
