import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roleType.enum';
import { ReadUserDto } from './dto/read-user.dto';
import { UserDetails } from './user.details.entity';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly _userService: UserService) { }


    @Get(':id')
    @Roles(RoleType.ADMIN)
    @UseGuards(AuthGuard(), RoleGuard)
    async getUser(@Param('id') id: string): Promise<ReadUserDto> {
        const user: User = await this._userService.get(parseInt(id))        
        return plainToClass(ReadUserDto, user)        
    }

    @Roles(RoleType.ADMIN)
    @UseGuards(AuthGuard())
    @Get()
    async getUsers(): Promise<ReadUserDto[]> {
        const users: User[] = await this._userService.getAll()
        return users.map((user: User) => plainToClass(ReadUserDto, user))
    }


    @Roles(RoleType.ADMIN)
    @UseGuards(AuthGuard())
    @Post()
    async createUser(@Body() user: User): Promise<User> {
        const createdUser: User = await this._userService.create(user)
        return createdUser
    }

    @Roles(RoleType.ADMIN)
    @UseGuards(AuthGuard())
    @Post('/userDetails')
    async createDetailsUser(@Body() userDetails: UserDetails): Promise<ReadUserDto> {
        const updatedUser: User = await this._userService.createDetailsUser(userDetails)
        return plainToClass(ReadUserDto, updatedUser)  
    }


    @Roles(RoleType.ADMIN, RoleType.AUTHOR, RoleType.GENERAL)
    @UseGuards(AuthGuard())
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: User) {
        await this._userService.update(parseInt(id), user)
        return HttpStatus.OK
    }

    @Roles(RoleType.ADMIN)
    @UseGuards(AuthGuard())
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this._userService.delete(parseInt(id))
        return HttpStatus.OK
    }

    @Roles(RoleType.ADMIN)
    @UseGuards(AuthGuard())
    @Put(':id/active')
    async active(@Param('id') id: string) {
        await this._userService.active(parseInt(id))
        return HttpStatus.OK
    }

    @Roles(RoleType.ADMIN)
    @UseGuards(AuthGuard())
    @Delete(':id/delete')
    async deleteFullUser(@Param('id') id: string) {
        await this._userService.deleteFull(parseInt(id))
        return HttpStatus.OK
    }

    @Roles(RoleType.ADMIN)
    @UseGuards(AuthGuard())
    @Post('setRole/:userId/:roleId')
    async setRoleToUse(@Param('userId') userId: string, @Param('roleId') roleId: string) {
        await this._userService.setRoleToUse(parseInt(userId), parseInt(roleId))
        return HttpStatus.OK
    }


}
