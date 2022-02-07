import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { RoleType } from "src/modules/role/roleType.enum";
import { UserDetails } from "../user.details.entity";

@Exclude()
export class ReadUserDto {
    @Expose()
    @IsNotEmpty()
    id: number

    @Expose()
    @IsNotEmpty()
    email: string

    @Expose()
    @IsNotEmpty()
    details: UserDetails

    @Expose()
    @IsNotEmpty()
    roles: RoleType[]
}