import { GameView } from "../../Controllers/GameView";
import { Game } from "../../Data/Entities/Game";
import { GameModel, IGame } from "../Models/GameModel";
import { PlayerMapper } from "./PlayerMapper";

export class GameMapper {
    static toGameModel(game: Game): GameModel {
        const gameModel = new GameModel(game.name, game.capacity, game.players?.map(PlayerMapper.toPlayerModel), game.id);
        return gameModel;
    }
    static toGameData(gameModel: GameModel): Game {
        const game = new Game();
        game.name = gameModel.name;
        game.capacity = gameModel.capacity;
        game.players = gameModel.getPlayers().map(PlayerMapper.toPlayerData);

        if (!!gameModel.id) {
            game.id = gameModel.id;
        }

        return game;
    }
    static toGameView(gameModel: IGame): GameView {
        const gameView = new GameView();
        gameView.name = gameModel.name;
        gameView.capacity = gameModel.capacity;
        gameView.players = gameModel.getPlayers().map(PlayerMapper.toPlayerView);

        if (!!gameModel.id) {
            gameView.id = gameModel.id;
        }

        return gameView;
    }
}
