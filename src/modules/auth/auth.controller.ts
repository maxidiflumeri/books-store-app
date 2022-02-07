import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService){}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() signUpDto: SignUpDto): Promise<User>{
        return this._authService.signUp(signUpDto)
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    async signIn(@Body() signInDto: SignInDto): Promise<TokenDto>{
        return this._authService.signIn(signInDto)
    }
}
