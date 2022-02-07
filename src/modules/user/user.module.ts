import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { RoleRepository } from '../role/role.repository';
import { UserDetailsRepository } from './user-details.repository';
@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, RoleRepository, UserDetailsRepository]),         
        AuthModule
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
