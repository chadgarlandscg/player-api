interface IGoldPieces {
    readonly value: number;
    minus(amount: number): IGoldPieces;
    plus(more: IGoldPieces): IGoldPieces;
}
