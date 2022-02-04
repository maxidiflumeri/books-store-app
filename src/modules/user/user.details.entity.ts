import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('user_details')
export class UserDetails extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string

    @Column({ type: 'varchar', name: 'last_name', length: 50, nullable: true })
    lastName: string

    @Column({ type: 'varchar', unique: true, length: 50, nullable: true })
    email: string

    @Column({ type: 'varchar', default: 'ACTIVE', length: 8, nullable: true })
    status: string

    @Column({ type: 'timestamp', name: 'birthday_date', nullable: true })
    birthdayDate: Date

    @Column({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date

    @Column({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date
}