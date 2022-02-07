import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserDetails } from './user.details.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';
import { Status } from 'src/shared/status.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository        
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
        const defaultRole = await repo.findOne({where: {name: 'GENERAL'}})
        user.roles = [defaultRole]
        const savedUser: User = await this._userRepository.save(user)

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



}
