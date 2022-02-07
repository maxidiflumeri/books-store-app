import { createParamDecorator } from "@nestjs/common";
import { ReadUserDto } from "../user/dto/read-user.dto";

export const getUser = createParamDecorator((data, req): ReadUserDto => {
    return req.user
})