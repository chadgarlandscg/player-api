import { injectable } from "inversify";
import { GameView } from "../../Controllers/GameView";
import { GameData, GameTypeData, ParticipantData } from "../../Data/Entities";
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
        this.toParticipantDataModels = this.toParticipantDataModels.bind(this);
        this.toParticipantDataModel = this.toParticipantDataModel.bind(this);
    }
    toModel(gameData: GameData, originalAggregate: Game): Game {
        const gameState = new GameState(gameData.id);
        gameState.lobbyName = gameData.lobbyName;
        gameState.lobbyThreshold = gameData.lobbyThreshold;
        gameState.lobbyCapacity = gameData.lobbyCapacity;
        gameState.startAutomatically = gameData.startAutomatically;
        gameState.bestOf = gameData.bestOf;
        gameState.status = gameData.status;
        gameState.type = gameData.gameType || originalAggregate.type;
        gameState.participants = gameData.participants && this.toParticipantModels(gameData.participants);

        return new Game(gameState);
    }
    private toParticipantModels(participants: ParticipantData[]): Participant[] {
        return participants.map(this.toParticipantModel);
    }
    private toParticipantModel(participantData: ParticipantData): Participant {
        return new Participant(
            participantData.name, 
            participantData.playerId, 
            participantData.status, 
            participantData.id
        );
    }
    toData(game: Game): GameData {
        const gameData = new GameData();
        gameData.lobbyName = game.lobbyName;
        gameData.lobbyThreshold = game.lobbyThreshold;
        gameData.lobbyCapacity = game.lobbyCapacity;
        gameData.startAutomatically = game.startAutomatically;
        gameData.bestOf = game.bestOf;
        gameData.participants = game.participants && this.toParticipantDataModels(game);

        gameData.gameTypeId = game.type.id;
        gameData.id = game.id;

        return gameData;
    }
    private toParticipantDataModels({participants, id}: Game): ParticipantData[] {
        return participants.map(p => this.toParticipantDataModel(p, id));
    }
    private toParticipantDataModel(participant: Participant, gameId: number): ParticipantData {
        const participantData = new ParticipantData();
        
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
        gameView.lobbyThreshold = gameDto.lobbyThreshold;
        gameView.lobbyCapacity = gameDto.lobbyCapacity;
        gameView.startAutomatically = gameDto.startAutomatically;
        gameView.gameTypeId = gameDto.type.id;
        gameView.gameType = gameDto.type.name;
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
            lobbyThreshold: game.lobbyThreshold,
            lobbyCapacity: game.lobbyCapacity,
            startAutomatically: game.startAutomatically,
            bestOf: game.bestOf,
            status: game.status,
            participants: game.participants,
            type: game.type || gameType,
        };
        return gameDto;
    }
}
