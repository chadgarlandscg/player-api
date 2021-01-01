import { injectable } from "inversify";
import { GameView } from "../../Controllers/GameView";
import * as DataEntities from "../../Data/Entities";
import { Game, GameState, IGame } from "../Models/Game";
import { Participant } from "../Models/Participant";
import { IGameRepositoryMapper, IGameServiceMapper, IGameViewMapper } from "./IGameMapper";

@injectable()
export class GameMapper implements IGameRepositoryMapper, IGameViewMapper, IGameServiceMapper {
    constructor() {
        this.toModel = this.toModel.bind(this);
        this.toData = this.toData.bind(this);
        this.toView = this.toView.bind(this);
        this.toDto = this.toDto.bind(this);
        this.toParticipantModels = this.toParticipantModels.bind(this);
        this.toParticipantModel = this.toParticipantModel.bind(this);
        this.toParticipantDataEntities = this.toParticipantDataEntities.bind(this);
        this.toParticipantDataEntity = this.toParticipantDataEntity.bind(this);
    }
    toModel(gameData: DataEntities.Game): Game {
        const gameState = new GameState(gameData.id);
        gameState.lobbyName = gameData.lobbyName;
        gameState.lobbyCapacity = gameData.lobbyCapacity;
        gameState.bestOf = gameData.bestOf;
        gameState.status = gameData.status;
        gameState.type = gameData.gameType;
        gameState.participants = gameData.participants && this.toParticipantModels(gameData.participants);

        return new Game(gameState);
    }
    private toParticipantModels(participants: DataEntities.Participant[]): Participant[] {
        return participants.map(this.toParticipantModel);
    }
    private toParticipantModel(participantData: DataEntities.Participant): Participant {
        return new Participant(
            participantData.name, 
            participantData.playerId, 
            participantData.status, 
            participantData.id
        );
    }
    toData(game: Game): DataEntities.Game {
        const gameData = new DataEntities.Game();
        gameData.lobbyName = game.lobbyName;
        gameData.lobbyCapacity = game.lobbyCapacity;
        gameData.bestOf = game.bestOf;
        gameData.participants = game.participants && this.toParticipantDataEntities(game);

        gameData.gameTypeId = game.type.id;
        gameData.id = game.id;

        return gameData;
    }
    private toParticipantDataEntities({participants, id}: Game): DataEntities.Participant[] {
        return participants.map(p => this.toParticipantDataEntity(p, id));
    }
    private toParticipantDataEntity(participant: Participant, gameId: number): DataEntities.Participant {
        const participantData = new DataEntities.Participant();
        
        participantData.gameId = gameId;
        participantData.name = participant.name;
        participantData.playerId = participant.playerId;
        participantData.status = participant.status;
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
        gameView.id = gameDto.id;

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
