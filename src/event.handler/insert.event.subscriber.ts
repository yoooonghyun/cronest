import {
  Connection,
  EntityManager,
  EntitySubscriberInterface,
  InsertEvent,
  TransactionCommitEvent,
} from 'typeorm';
import { EventBus } from '@nestjs/cqrs';

export abstract class InsertEventSubscriber<T> implements EntitySubscriberInterface<T> {
  private readonly transactionMap: Map<EntityManager, [T]>;

  constructor(readonly connection: Connection, readonly eventBus: EventBus) {
    connection.subscribers.push(this);
    this.transactionMap = new Map<EntityManager, [T]>();
  }

  protected handleInsertEvent(eventPayload: T): void {
    this.eventBus.publish(eventPayload);
  }

  public afterInsert(insertEvent: InsertEvent<T>): void {
    const mgr: EntityManager = insertEvent.manager;
    const plainPayload: T = insertEvent.entity;
    const paylaodType = insertEvent.metadata.target;

    const eventPaylaod: T = mgr.getRepository(paylaodType).create(plainPayload) as T;

    if (insertEvent.queryRunner.isTransactionActive) {
      this.insertEntityToMap(insertEvent.manager, eventPaylaod);
    } else {
      this.handleInsertEvent(eventPaylaod);
    }
  }

  private insertEntityToMap(manager: EntityManager, entity: T) {
    const entities = this.transactionMap.get(manager);

    if (entities) {
      entities.push(entity);
    } else {
      this.transactionMap.set(manager, [entity]);
    }
  }

  public afterTransactionCommit(event: TransactionCommitEvent): void {
    const { manager } = event;
    const entities = this.transactionMap.get(manager);

    if (entities) {
      this.transactionMap.delete(manager);
      entities.map((e) => this.handleInsertEvent(e));
    }
  }

  public afterTransactionRollback(event: TransactionCommitEvent): void {
    this.transactionMap.delete(event.manager);
  }
}
