import { ContainerModule } from "inversify";
import TYPES from "./types";
import { PlayerService } from "../Services/PlayerService";
import { PlayerDao } from "../Data/PlayerDao";
import { IPlayerService } from "../Services/IPlayerService";
import { IPlayerDao } from "../Data/IPlayerDao";
import { Player } from "../Data/Entities/Player";
import { Repository, getRepository } from "typeorm";
import { IGameService } from "../Services/IGameService";
import { IGameDao } from "../Data/IGameDao";
import { GameService } from "../Services/GameService";
import { GameDao } from "../Data/GameDao";
import { Game } from "../Data/Entities/Game";

import "../Controllers/PlayerController" // auto-binding courtesy of the utils
import "../Controllers/GameController" // auto-binding courtesy of the utils
import { IGameRepository } from "../Domain/Repositories/IGameRepository";
import { GameRepository } from "../Domain/Repositories/GameRepository";
import { IPlayerRepository } from "../Domain/Repositories/IPlayerRepository";
import { PlayerRepository } from "../Domain/Repositories/PlayerRepository";

export const bindings = new ContainerModule(bind => {
    bind<IGameService>(TYPES.IGameService).to(GameService);
    bind<IGameDao>(TYPES.IGameDao).to(GameDao);
    bind<IGameRepository>(TYPES.IGameRepository).to(GameRepository);
    bind<Repository<Game>>(TYPES.IGameDataRepository).toDynamicValue(() => {
        return getRepository(Game);
    }).inRequestScope();

    bind<IPlayerService>(TYPES.IPlayerService).to(PlayerService);
    bind<IPlayerDao>(TYPES.IPlayerDao).to(PlayerDao);
    bind<IPlayerRepository>(TYPES.IPlayerRepository).to(PlayerRepository);
    bind<Repository<Player>>(TYPES.IPlayerDataRepository).toDynamicValue(() => {
        return getRepository(Player);
    }).inRequestScope();
})