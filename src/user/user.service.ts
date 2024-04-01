import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from 'src/user/dto/userDTO';
import { isUUID } from 'src/utils/uuid';
import prisma from 'src/prismaClient/prismaClient';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  async getAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users.map((user) => ({
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    }));
  }

  async getById(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }

    const user = await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    } else {
      return {
        ...user,
        createdAt: Number(user.createdAt),
        updatedAt: Number(user.updatedAt),
      };
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await prisma.user.create({
      data: {
        id: uuidv4(),
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return {
      ...newUser,
      createdAt: Number(newUser.createdAt),
      updatedAt: Number(newUser.updatedAt),
    };
  }

  async updateUser(
    userId: string,
    { newPassword, oldPassword }: UpdatePasswordDto,
  ) {
    if (!isUUID(userId)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }

    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }
    if (user.password !== oldPassword) {
      throw new HttpException('old password is wrong', HttpStatus.FORBIDDEN);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        password: newPassword,
        version: {
          increment: 1,
        },
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...updatedUser,
      createdAt: Number(updatedUser.createdAt),
      updatedAt: Number(updatedUser.updatedAt),
    };
  }

  async deleteUser(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }

    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    } else {
      await prisma.user.delete({ where: { id } });
    }
  }
}
