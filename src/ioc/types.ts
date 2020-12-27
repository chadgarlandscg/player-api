const TYPES = {
    IPlayerService: Symbol("IPlayerService"),
    IPlayerDao: Symbol("IPlayerDao"),
    IPlayerDataRepository: Symbol("IPlayerDataRepository"),
    IPlayerRepository: Symbol("IPlayerRepository"),
    IGameService: Symbol("IGameService"),
    IGameDao: Symbol("IGameDao"),
    IGameMapper: Symbol("IGameMapper"),
    IGameDataRepository: Symbol("IGameDataRepository"),
    IGameRepository: Symbol("IGameRepository"),
    // Standard Types:
    IGameTypeDataRepository: Symbol("IGameTypeDataRepository"),
    IMoveTypeDataRepository: Symbol("IMoveTypeDataRepository"),
};

export default TYPES;