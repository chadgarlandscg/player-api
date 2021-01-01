declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
    */

    /**
     * Same as Partial<T> but goes deeper and makes Partial<T> all its properties and sub-properties.
    */
    declare type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
    };

}

export {}