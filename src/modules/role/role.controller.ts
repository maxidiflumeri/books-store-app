import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {

    constructor(private readonly _roleService: RoleService) { }

    @Get(':id')
    async getRole(@Param('id') id: string): Promise<Role> {
        const role: Role = await this._roleService.get(parseInt(id))
        return role
    }

    @Get()
    async getRoles(): Promise<Role[]> {
        const roles: Role[] = await this._roleService.getAll()
        return roles
    }


    @Post()
    async createRole(@Body() role: Role): Promise<Role> {
        const createdRole: Role = await this._roleService.create(role)
        return createdRole
    }

    @Put(':id')
    async updateRole(@Param('id') id: string, @Body() role: Role) {
        await this._roleService.update(parseInt(id), role)
        return HttpStatus.OK
    }

    @Delete(':id')
    async deleteRole(@Param('id') id: string) {
        await this._roleService.delete(parseInt(id))
        return HttpStatus.OK
    }

    @Put(':id/active')
    async active(@Param('id') id: string) {
        await this._roleService.active(parseInt(id))
        return HttpStatus.OK
    }
}
