import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly _userService: UserService) { }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserDto> {
        const user: UserDto = await this._userService.get(parseInt(id))
        return user
    }

    @Get()
    async getUsers(): Promise<UserDto[]> {
        const users: UserDto[] = await this._userService.getAll()
        return users
    }


    @Post()
    async createUser(@Body() user: User): Promise<UserDto> {
        const createdUser: UserDto = await this._userService.create(user)
        return createdUser
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: User) {
        await this._userService.update(parseInt(id), user)
        return HttpStatus.OK
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this._userService.delete(parseInt(id))
        return HttpStatus.OK
    }

    @Put(':id')
    async active(@Param('id') id: string) {
        await this._userService.active(parseInt(id))
        return HttpStatus.OK
    }


}
