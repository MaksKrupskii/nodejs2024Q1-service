import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from 'src/dto/userDTO';
import { User, UserWithoutPassword } from 'src/interfaces/user';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.userService.getById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserWithoutPassword {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updateUser(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
