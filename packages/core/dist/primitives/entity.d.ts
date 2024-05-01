export declare abstract class Entity {
    private readonly _id;
    constructor(id: bigint);
    get id(): bigint;
    equals(other: Entity | null): boolean;
}
