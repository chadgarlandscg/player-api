import { ContainerModule } from "inversify";
import TYPES from "./types";
import { PlayerService } from "../Application/Services/PlayerService";
import { PlayerDao } from "../Data/PlayerDao";
import { IPlayerService } from "../Application/Services/IPlayerService";
import { IPlayerDao } from "../Data/IPlayerDao";
import { Player } from "../Data/Entities/Player";
import { Repository, getRepository } from "typeorm";
import { IGameService } from "../Application/Services/IGameService";
import { IGameDao } from "../Data/IGameDao";
import { GameService } from "../Application/Services/GameService";
import { GameDao } from "../Data/GameDao";
import { Game } from "../Data/Entities/Game";

import "../Controllers/GameTypeController" // auto-binding courtesy of the utils
import "../Controllers/PlayerController" // auto-binding courtesy of the utils
import "../Controllers/GameController" // auto-binding courtesy of the utils
import { IGameRepository } from "../Domain/Repositories/IGameRepository";
import { GameRepository } from "../Domain/Repositories/GameRepository";
import { IPlayerRepository } from "../Domain/Repositories/IPlayerRepository";
import { PlayerRepository } from "../Domain/Repositories/PlayerRepository";
import { IGameRepositoryMapper, IGameServiceMapper, IGameViewMapper } from "../Domain/Mappers/IGameMapper";
import { GameMapper } from "../Domain/Mappers/GameMapper";
import { IGameDataRepository } from "../Data/IGameDataRepository";
import * as DataEntities from "../Data/Entities";
import { IGameTypeDataRepository } from "../Data/Repositories/IGameTypeDataRepository";
import { IMoveTypeDataRepository } from "../Data/Repositories/IMoveTypeDataRepository";
import { GameTypeDao } from "../Data/GameTypeDao";
import { IGameTypeDao } from "../Data/IGameTypeDao";
import { IRockPaperScissorsService, RockPaperScissorsService } from "../Domain/Services/RockPaperScissorsService";
import { GameLobbyService, IGameLobbyService } from "../Domain/Services/GameLobbyService";

export const bindings = new ContainerModule(bind => {
    bind<IGameService>(TYPES.IGameService).to(GameService);
    bind<IGameLobbyService>(TYPES.IGameLobbyService).to(GameLobbyService);
    bind<IRockPaperScissorsService>(TYPES.IRockPaperScissorsService).to(RockPaperScissorsService);
    bind<IGameDao>(TYPES.IGameDao).to(GameDao);
    bind<IGameViewMapper>(TYPES.IGameViewMapper).to(GameMapper);
    bind<IGameRepositoryMapper>(TYPES.IGameRepositoryMapper).to(GameMapper);
    bind<IGameServiceMapper>(TYPES.IGameServiceMapper).to(GameMapper);
    bind<IGameRepository>(TYPES.IGameRepository).to(GameRepository);
    bind<IGameDataRepository>(TYPES.IGameDataRepository).toDynamicValue(() => {
        return getRepository(Game);
    }).inRequestScope();

    bind<IPlayerService>(TYPES.IPlayerService).to(PlayerService);
    bind<IPlayerDao>(TYPES.IPlayerDao).to(PlayerDao);
    bind<IPlayerRepository>(TYPES.IPlayerRepository).to(PlayerRepository);
    bind<Repository<Player>>(TYPES.IPlayerDataRepository).toDynamicValue(() => {
        return getRepository(Player);
    }).inRequestScope();

    bind<IGameTypeDao>(TYPES.IGameTypeDao).to(GameTypeDao);
    bind<IGameTypeDataRepository>(TYPES.IGameTypeDataRepository).toDynamicValue(() => {
        return getRepository(DataEntities.GameType);
    }).inRequestScope();
    bind<IMoveTypeDataRepository>(TYPES.IMoveTypeDataRepository).toDynamicValue(() => {
        return getRepository(DataEntities.MoveType);
    }).inRequestScope();
})