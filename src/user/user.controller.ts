import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDto } from './dto';
import { PaginationDto } from '../common/dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param() args: GetUserDto) {
    return this.userService.getUserById(args.id);
  }

  @Get()
  async getUsers(@Query() args: PaginationDto) {
    return this.userService.getUsers(args.offset, args.limit);
  }
}
