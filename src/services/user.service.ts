import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  isUserExist,
  updateUserPassword,
} from 'src/db/userDB';
import { CreateUserDto, UpdatePasswordDto } from 'src/dto/userDTO';
import { User, UserWithoutPassword } from 'src/interfaces/user';
import { hasAllFields } from 'src/utils/hasAllFields';
import { isUUID } from 'src/utils/uuid';

@Injectable()
export class UserService {
  getAll(): User[] {
    return getAllUsers();
  }

  getById(id: string): User {
    if (!isUUID(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isUserExist(id)) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }

    const user = getUserById(id);
    return user;
  }

  createUser(createUserDto: CreateUserDto): UserWithoutPassword {
    if (hasAllFields(createUserDto, 'user')) {
      const newUser = createUser(createUserDto);
      return newUser;
    } else {
      throw new HttpException(
        'body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (!isUUID(id) || !hasAllFields(updatePasswordDto, 'password')) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isUserExist(id)) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }
    const response = updateUserPassword(id, updatePasswordDto);
    if (response.errorStatus) {
      throw new HttpException(response.errorText, response.errorStatus);
    } else {
      return response;
    }
  }

  deleteUser(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    if (!isUserExist(id)) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }
    deleteUser(id);
  }
}
