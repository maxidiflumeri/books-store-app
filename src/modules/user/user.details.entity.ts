import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user_details')
export class UserDetails extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string

    @Column({ type: 'varchar', name: 'last_name', length: 50, nullable: true })
    lastName: string

    @Column({ type: 'timestamp', name: 'birthday_date', nullable: true })
    birthdayDate: Date

    @Column({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: number

    @Column({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: number

    @BeforeUpdate()
    public setUpdatedAt() {
        this.updatedAt = Math.floor(Date.now() / 1000);
    }

    @BeforeInsert()
    public setCreatedAt() {
        this.createdAt = Math.floor(Date.now() / 1000);
    }
}