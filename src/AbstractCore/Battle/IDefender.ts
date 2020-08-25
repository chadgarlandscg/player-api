interface IDefender {
    defend(attack: IAttack): IAttack;
    readonly resistance;
}
