import { IsNotEmpty } from "class-validator";
import { RoleType } from "src/modules/role/roleType.enum";
import { UserDetails } from "../user.details.entity";

export class UserDto {
    @IsNotEmpty()    
    id: number

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    roles: RoleType[]

    @IsNotEmpty()
    details: UserDetails
}