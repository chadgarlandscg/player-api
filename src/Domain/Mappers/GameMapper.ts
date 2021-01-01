import { injectable } from "inversify";
import { GameView } from "../../Controllers/GameView";
import * as DataEntities from "../../Data/Entities";
import { Game, IGame } from "../Models/Game";
import { Participant } from "../Models/Participant";
import { IGameRepositoryMapper, IGameServiceMapper, IGameViewMapper } from "./IGameMapper";

@injectable()
export class GameMapper implements IGameRepositoryMapper, IGameViewMapper, IGameServiceMapper {
    toModel(gameData: DataEntities.Game): Game {
        return new Game({...gameData, type: gameData.gameType});
    }
    toData(game: Game): DataEntities.Game {
        const gameData = new DataEntities.Game();
        gameData.lobbyName = game.lobbyName;
        gameData.lobbyCapacity = game.lobbyCapacity;
        gameData.bestOf = game.bestOf;
        gameData.participants = this.toParticipants(game);

        gameData.gameTypeId = game.type.id;
        if (game.id) {
            gameData.id = game.id;
        }

        return gameData;
    }
    private toParticipants({participants, id}: Game): DataEntities.Participant[] {
        return participants.map(p => this.toParticipant(p, id));
    }
    private toParticipant(participant: Participant, gameId?: number): DataEntities.Participant {
        const participantData = new DataEntities.Participant();
        if (gameId) {
            participantData.gameId = gameId;
        }
        participantData.name = participant.name;
        participantData.playerId = participant.playerId;
        participantData.id = participant.id;

        return participantData;
    }
    toView(gameDto: IGame): GameView {
        const gameView = new GameView();
        gameView.lobbyName = gameDto.lobbyName;
        gameView.gameTypeId = gameDto.type.id;
        gameView.gameType = gameDto.type?.name;
        gameView.bestOf = gameDto.bestOf;
        gameView.status = gameDto.status;
        gameView.participants = gameDto.participants;
        if (!!gameDto.id) {
            gameView.id = gameDto.id;
        }

        return gameView;
    }

    toDto<GameType>(game: Game, gameType: GameType): IGame {
        const gameDto: IGame = {
            id: game.id,
            lobbyName: game.lobbyName,
            lobbyCapacity: game.lobbyCapacity,
            bestOf: game.bestOf,
            status: game.status,
            participants: game.participants,
            type: game.type || gameType,
        };
        return gameDto;
    }
}
