import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDetails } from './user.details.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';
import { Status } from '../../shared/status.enum';
import { RoleRepository } from '../role/role.repository';
import { UserDetailsRepository } from './user-details.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
        @InjectRepository(UserDetailsRepository)
        private readonly _userDetailsRepository: UserDetailsRepository
    ) { }

    async get(id: number): Promise<User> {
        if (!id) {
            throw new BadRequestException('Id must be send.')
        }

        const user: User = await this._userRepository.findOne(id, { where: { status: Status.ACTIVE } })

        if (!user) {
            throw new NotFoundException('User does not exists.')
        }

        return user
    }

    async getAll(): Promise<User[]> {
        const users: User[] = await this._userRepository.find({ where: { status: Status.ACTIVE } })

        return users
    }

    async create(user: User): Promise<User> {
        const details = new UserDetails()
        user.details = details
        const repo = getConnection().getRepository(Role)
        const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } })
        user.roles = [defaultRole]
        const savedUser: User = await this._userRepository.save(user)

        return user
    }

    async createDetailsUser(userDetails: UserDetails): Promise<User> {
        const user: User = await this._userRepository.findOne(userDetails.id)

        if (!user) {
            throw new NotFoundException('User does not exists.')
        }            
        
        user.details = userDetails
        await this._userDetailsRepository.update(userDetails.id, userDetails)

        return user
    }

    async update(id: number, user: User): Promise<void> {
        if (!id) {
            throw new BadRequestException('Id must be send.')
        }

        const userExist: User = await this._userRepository.findOne(id, { where: { status: Status.ACTIVE } })

        if (!userExist) {
            throw new NotFoundException('User does not exists.')
        }

        await this._userRepository.update(id, user)
    }

    async delete(id: number): Promise<void> {
        if (!id) {
            throw new BadRequestException('Id must be send.')
        }

        const userExist: User = await this._userRepository.findOne(id, { where: { status: Status.ACTIVE } })

        if (!userExist) {
            throw new NotFoundException('User does not exists.')
        }

        await this._userRepository.update(id, { status: Status.INACTIVE })
    }

    async deleteFull(id: number): Promise<void> {
        if (!id) {
            throw new BadRequestException('Id must be send.')
        }

        const userExist: User = await this._userRepository.findOne(id, { where: { status: Status.ACTIVE } })

        if (!userExist) {
            throw new NotFoundException('User does not exists.')
        }

        await this._userRepository.delete(id)
    }

    async active(id: number): Promise<void> {
        if (!id) {
            throw new BadRequestException('Id must be send.')
        }

        const userExist: User = await this._userRepository.findOne(id)

        if (!userExist) {
            throw new NotFoundException('User does not exists.')
        }

        await this._userRepository.update(id, { status: Status.ACTIVE })
    }

    async setRoleToUse(userId: number, roleId: number) {
        if (!userId) {
            throw new BadRequestException('User id must be send.')
        }

        if (!roleId) {
            throw new BadRequestException('Role id must be send.')
        }

        const userExist: User = await this._userRepository.findOne(userId, { where: { status: Status.ACTIVE } })

        if (!userExist) {
            throw new NotFoundException('User does not exists.')
        }

        const roleExist: Role = await this._roleRepository.findOne(roleId, { where: { status: Status.ACTIVE } })

        if (!roleExist) {
            throw new NotFoundException('Role does not exists.')
        }

        userExist.roles.forEach(rol => {
            if (rol.id == roleExist.id) {
                throw new ConflictException('Role already exists in this user')
            }
        })

        userExist.roles.push(roleExist)
        await this._userRepository.save(userExist)

    }

}
