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
import { CreateUserDto, UpdatePasswordDto } from 'src/user/dto/userDTO';
import { UserWithoutPassword } from 'src/user/types/user';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.updateUser(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
