class GoldPieces implements IGoldPieces {
    constructor(private _value: number) {
    }
    minus(amount: number) {
        const available = this._value - amount < 0 ? this._value : amount;
        this._value -= available;
        return new GoldPieces(available);
    }
    plus(more: IGoldPieces) {
        this._value += more.value;
        return this;
    }
    get value(): number {
        return this._value;
    }
}
