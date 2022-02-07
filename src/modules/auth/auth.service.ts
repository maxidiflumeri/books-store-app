import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { RoleType } from '../role/roleType.enum';
import { User } from '../user/user.entity';
import { AuthRepository } from './auth.repository';
import { SignInDto, SignUpDto } from './dto';
import { TokenDto } from './dto/token.dto';
import { IJwtPayload } from './jwtPayload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService) { }

    async signUp(signUpDto: SignUpDto): Promise<User> {
        const { email } = signUpDto
        const userExists = await this._authRepository.findOne({ where: { email: email } })

        if (userExists) {
            throw new ConflictException('email already exists')
        }

        const user: User = await this._authRepository.singUp(signUpDto)
        return user
    }

    async signIn(signInDto: SignInDto): Promise<TokenDto> {
        const { email, password } = signInDto
        const user: User = await this._authRepository.findOne({ where: { email: email } })

        if (!user) {
            throw new NotFoundException('user does not exists')
        }

        const isMatch = await compare(password, user.password)

        if (!isMatch) {
            throw new UnauthorizedException('invalid credentials')
        }    

        const payload: IJwtPayload = {
            id: user.id,
            email: user.email,
            name: user.details.name,
            lastname: user.details.lastName,
            roles: user.roles.map(r => r.name as RoleType)
        }        

        const token = this._jwtService.sign(payload)
        const tokenDto: TokenDto = new TokenDto()        
        tokenDto.user = payload
        tokenDto.token = token        

        return tokenDto
    }
}
