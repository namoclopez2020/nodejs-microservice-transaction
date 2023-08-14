import { TransactionStatus } from '../../../Domain/Constants/transaction-status.constant';
import { Entity, Generated, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  transactionExternalId: string;

  @Column({
    type: 'varchar'
  })
  accountExternalIdDebit: string;

  @Column({
    type: 'varchar'
  })
  accountExternalIdCredit: string;

  @Column('int')
  tranferTypeId: number;

  @Column({
    type: 'varchar',
    default: TransactionStatus.PENDING
  })
  status: TransactionStatus;

  @Column({ type: 'decimal', precision: 17, scale: 2 })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}