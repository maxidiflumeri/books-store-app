import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly _userService: UserService) { }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        const user: User = await this._userService.get(parseInt(id))
        return user
    }

    @UseGuards(AuthGuard())
    @Get()
    async getUsers(): Promise<User[]> {
        const users: User[] = await this._userService.getAll()
        return users
    }


    @Post()
    async createUser(@Body() user: User): Promise<User> {
        const createdUser: User = await this._userService.create(user)
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

    @Put(':id/active')
    async active(@Param('id') id: string) {
        await this._userService.active(parseInt(id))
        return HttpStatus.OK
    }

    @Delete(':id/delete')
    async deleteFullUser(@Param('id') id: string) {
        await this._userService.deleteFull(parseInt(id))
        return HttpStatus.OK
    }


}
