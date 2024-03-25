import { HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from 'src/user/dto/userDTO';
import { User, UserWithoutPassword } from 'src/user/types/user';
import { v4 as uuidv4 } from 'uuid';

let users: User[] = [];

export const getAllUsers = () => {
  return users;
};

export const getUserById = (id: string): User => {
  const user = users.find((user) => user.id === id);
  return user;
};

export const createUser = ({
  login,
  password,
}: CreateUserDto): UserWithoutPassword => {
  const time = new Date().getTime();
  const newUser = {
    id: uuidv4(), // uuid v4
    login,
    version: 1, // integer number, increments on update
    createdAt: time, // timestamp of creation
    updatedAt: time,
  };

  users.push({ ...newUser, password });

  return newUser;
};

export const updateUserPassword = (
  userId: string,
  { newPassword, oldPassword }: UpdatePasswordDto,
) => {
  const userIndex = users.findIndex((user) => user.id === userId);
  const { password, version, id, login, createdAt } = users[userIndex];
  if (password !== oldPassword) {
    return {
      errorStatus: HttpStatus.FORBIDDEN,
      errorText: 'old password is wrong',
    };
  }
  const newVersion = version + 1;
  const updateTime = new Date().getTime();
  users[userIndex] = {
    ...users[userIndex],
    password: newPassword,
    version: newVersion,
    updatedAt: updateTime,
  };

  return {
    id: id,
    login: login,
    version: newVersion,
    updatedAt: updateTime,
    createdAt: createdAt,
  };
};

export const deleteUser = (userId: string) => {
  users = users.filter((user) => userId !== user.id);
};

export const isUserExist = (userId: string): boolean => {
  const user = users.find((user) => user.id === userId);
  return !!user;
};
