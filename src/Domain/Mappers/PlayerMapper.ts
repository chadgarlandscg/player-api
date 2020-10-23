import { PlayerView } from "../../Controllers/PlayerView";
import { Player } from "../../Data/Entities/Player";
import { PlayerModel } from "../Models/PlayerModel";

export class PlayerMapper {
    static toPlayerModel(player: Player): PlayerModel {
        const playerModel = new PlayerModel(player.name, player.email, player.id);
        return playerModel;
    }
    static toPlayerData(playerModel: PlayerModel): Player {
        const player = new Player();
        player.name = playerModel.name;
        player.email = playerModel.email;
        if (!!playerModel.id) {
            player.id = playerModel.id;
        }

        return player;
    }
    static toPlayerView(playerModel: PlayerModel): PlayerView {
        const playerView = new PlayerView();
        playerView.name = playerModel.name;
        if (!!playerModel.id) {
            playerView.id = playerModel.id;
        }

        return playerView;
    }
}
