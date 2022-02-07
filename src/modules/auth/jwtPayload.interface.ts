import { RoleType } from "../role/roleType.enum";

export interface IJwtPayload {
    id: number
    email: string
    name: string
    lastname: string
    roles: RoleType[]
    iat?: Date
}