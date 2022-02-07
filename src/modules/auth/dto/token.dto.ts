import { IsNotEmpty } from "class-validator";
import { RoleType } from "src/modules/role/roleType.enum";
import { IJwtPayload } from "../jwtPayload.interface";

export class TokenDto {
    @IsNotEmpty()  
    user: IJwtPayload

    @IsNotEmpty()  
    token: string
}