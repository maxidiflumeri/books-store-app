import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { MapperService } from '../../shared/mapper.service';
import { Status } from 'src/shared/status.enum';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository,
        private readonly _mapperService: MapperService
    ) { }

    async get(id: number): Promise<Role> {
        if (!id) {
            throw new BadRequestException('Id must be send.')
        }

        const role: Role = await this._roleRepository.findOne(id, { where: { status: Status.ACTIVE } })        

        if (!role) {
            throw new NotFoundException('Role does not exists.')
        }

        return role
    }

    async getAll(): Promise<Role[]> {
        const roles: Role[] = await this._roleRepository.find({ where: { status: Status.ACTIVE } })

        return roles
    }

    async create(role: Role): Promise<Role> {
        role.name = role.name.toLocaleUpperCase()
        const roleExist: Role = await this._roleRepository.findOne( { where: { name: role.name } })
        if (roleExist) {
            throw new BadRequestException('Role name does exists. Please change name.')
        }
        const savedRole: Role = await this._roleRepository.save(role)
        return savedRole
    }

    async update(id: number, role: Role): Promise<void> {
        role.name = role.name.toLocaleUpperCase()
        if (!id) {
            throw new BadRequestException('Id must be send.')
        }

        const roleExist: Role = await this._roleRepository.findOne(id, { where: { status: Status.ACTIVE } })

        if (!roleExist) {
            throw new NotFoundException('Role does not exists.')
        }

        await this._roleRepository.update(id, role)
    }

    async delete(id: number): Promise<void> {
        if (!id) {
            throw new BadRequestException('Id must be send.')
        }

        const roleExist: Role = await this._roleRepository.findOne(id, { where: { status: Status.ACTIVE } })

        if (!roleExist) {
            throw new NotFoundException('Role does not exists.')
        }

        await this._roleRepository.update(id, { status: Status.INACTIVE })
    }

    async active(id: number): Promise<void> {
        if (!id) {
            throw new BadRequestException('Id must be send.')
        }
        
        const roleExist: Role = await this._roleRepository.findOne(id)

        if (!roleExist) {
            throw new NotFoundException('Role does not exists.')
        }

        await this._roleRepository.update(id, { status: Status.ACTIVE })
    }

}
