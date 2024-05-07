import { Entity } from './entity';

export abstract class AggregateRoot<
  Type extends string | bigint,
> extends Entity<Type> {}
