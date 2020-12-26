import { PlayerView } from "../../Controllers/PlayerView";
import { Player } from "../../Data/Entities/Player";
import { PlayerModel } from "../Models/PlayerModel";

export class PlayerMapper {
    static toPlayerModel(player: Player): PlayerModel {
        const playerModel = new PlayerModel(player.username, player.code, player.id);
        return playerModel;
    }
    static toPlayerData(playerModel: PlayerModel): Player {
        const player = new Player();
        player.username = playerModel.username;
        player.code = playerModel.code;
        if (!!playerModel.id) {
            player.id = playerModel.id;
        }

        return player;
    }
    static toPlayerView(playerModel: PlayerModel): PlayerView {
        const playerView = new PlayerView();
        playerView.username = playerModel.username;
        playerView.code = playerModel.code;
        if (!!playerModel.id) {
            playerView.id = playerModel.id;
        }

        return playerView;
    }
}
