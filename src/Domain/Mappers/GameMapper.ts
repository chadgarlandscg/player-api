import { Game } from "../../Data/Entities/Game";
import { GameModel } from "../Models/GameModel";
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
}
