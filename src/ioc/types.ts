const TYPES = {
    IPlayerService: Symbol("IPlayerService"),
    IPlayerDao: Symbol("IPlayerDao"),
    IPlayerDataRepository: Symbol("IPlayerDataRepository"),
    IPlayerRepository: Symbol("IPlayerRepository"),
    IGameService: Symbol("IGameService"),
    IGameDao: Symbol("IGameDao"),
    IGameServiceMapper: Symbol("IGameServiceMapper"),
    IGameRepositoryMapper: Symbol("IGameRepositoryMapper"),
    IGameViewMapper: Symbol("IGameViewMapper"),
    IGameDataRepository: Symbol("IGameDataRepository"),
    IGameRepository: Symbol("IGameRepository"),
    IGameLobbyService: Symbol("IGameLobbyService"),
    IRockPaperScissorsService: Symbol("IRockPaperScissorsService"),
    // Standard Types:
    IGameTypeDao: Symbol("IGameTypeDao"),
    IGameTypeDataRepository: Symbol("IGameTypeDataRepository"),
    IMoveTypeDataRepository: Symbol("IMoveTypeDataRepository"),
};

export default TYPES;