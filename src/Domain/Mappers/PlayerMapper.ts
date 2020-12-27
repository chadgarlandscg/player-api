import { PlayerView } from "../../Controllers/PlayerView";
import * as DataEntities from "../../Data/Entities";
import { Player } from "../Models/Player";

export class PlayerMapper {
    static toPlayerModel(player: DataEntities.Player): Player {
        const playerModel = new Player(player.username, player.code, player.id);
        return playerModel;
    }
    static toPlayerData(playerModel: Player): DataEntities.Player {
        const player = new DataEntities.Player();
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
