import { Status } from "../../shared/status.enum";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity('roles')
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 20, nullable: false })
    name: string

    @Column({ type: 'varchar', nullable: false })
    description: string

    @ManyToMany(type => User, user => user.roles)    
    users: User[]

    @Column({ type: 'varchar', default: Status.ACTIVE, length: 8, nullable: false })
    status: string

    @Column({ type: 'timestamp', name: 'created_at' })
    updatedAt: number

    @Column({ type: 'timestamp', name: 'updated_at' })
    createdAt: number

    @BeforeUpdate()
    public setUpdatedAt() {
        this.updatedAt = Math.floor(Date.now() / 1000);
    }

    @BeforeInsert()
    public setCreatedAt() {
        this.createdAt = Math.floor(Date.now() / 1000);
    }
}