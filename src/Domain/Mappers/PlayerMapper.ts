import { PlayerView } from "../../Controllers/PlayerView";
import { PlayerData } from "../../Data/Entities";
import { Player } from "../Models/Player";

export class PlayerMapper {
    static toPlayerModel(player: PlayerData): Player {
        const playerModel = new Player(player.username, player.code, player.id);
        return playerModel;
    }
    static toPlayerData(playerModel: Player): PlayerData {
        const player = new PlayerData();
        player.username = playerModel.username;
        player.code = playerModel.code;
        if (!!playerModel.id) {
            player.id = playerModel.id;
        }

        return player;
    }
    static toPlayerView(playerModel: Player): PlayerView {
        const playerView = new PlayerView();
        playerView.username = playerModel.username;
        playerView.code = playerModel.code;
        if (!!playerModel.id) {
            playerView.id = playerModel.id;
        }

        return playerView;
    }
}
