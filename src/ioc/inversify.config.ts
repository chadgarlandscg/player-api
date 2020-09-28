import { ContainerModule } from "inversify";
import TYPES from "./types";
import { PlayerService } from "../Services/PlayerService";
import { PlayerDao } from "../Data/PlayerDao";
import { IPlayerService } from "../Services/IPlayerService";
import { IPlayerDao } from "../Data/IPlayerDao";
import { Player } from "../Entities/Player";
import { Repository, getRepository } from "typeorm";
import { IGameService } from "../Services/IGameService";
import { IGameDao } from "../Data/IGameDao";
import { GameService } from "../Services/GameService";
import { GameDao } from "../Data/GameDao";
import { Game } from "../Entities/Game";

import "../Controllers/PlayerController" // auto-binding courtesy of the utils
import "../Controllers/GameController" // auto-binding courtesy of the utils

export const bindings = new ContainerModule(bind => {
    bind<IGameService>(TYPES.IGameService).to(GameService);
    bind<IGameDao>(TYPES.IGameDao).to(GameDao);
    bind<Repository<Game>>(TYPES.IGameRepository).toDynamicValue(() => {
        return getRepository(Game);
    }).inRequestScope();

    bind<IPlayerService>(TYPES.IPlayerService).to(PlayerService);
    bind<IPlayerDao>(TYPES.IPlayerDao).to(PlayerDao);
    bind<Repository<Player>>(TYPES.IPlayerRepository).toDynamicValue(() => {
        return getRepository(Player);
    }).inRequestScope();
})