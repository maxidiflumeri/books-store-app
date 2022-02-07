import { EntityRepository, Repository } from "typeorm";
import { UserDetails } from "./user.details.entity";

@EntityRepository(UserDetails)
export class UserDetailsRepository extends Repository<UserDetails>{ }