interface IAttack extends ITurnAction {
    attacker: IAttacker;
    defender: IDefender;
    readonly damage: number;
}
