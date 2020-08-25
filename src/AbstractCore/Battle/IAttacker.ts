interface IAttacker {
    attack(defender: IDefender): IDefender;
    readonly power;
}
