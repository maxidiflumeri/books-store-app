import { Status } from '../../shared/status.enum'
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from '../role/role.entity'
import { UserDetails } from './user.details.entity'

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', unique: true, length: 50, nullable: false })
    email: string

    @Column({ type: 'varchar', nullable: false })
    password: string

    @OneToOne(type => UserDetails, { cascade: true, nullable: false, eager: true })
    @JoinColumn({ name: 'detail_id' })
    details: UserDetails

    @ManyToMany(type => Role, role => role.users, {eager: true})
    @JoinTable({ name: 'user_roles' })
    roles: Role[]

    @Column({ type: 'varchar', default: Status.ACTIVE, length: 8, nullable: false })
    status: string

    @Column({ type: 'timestamp', name: 'created_at' })
    createdAt: number

    @Column({ type: 'timestamp', name: 'updated_at' })
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