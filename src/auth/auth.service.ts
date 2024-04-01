import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from 'src/prismaClient/prismaClient';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto, RefreshDto, SignupDto } from './dto/authDTO';
import { excludeField } from 'src/utils/excludeField';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async signup(dto: SignupDto) {
    const user = await prisma.user.findFirst({
      where: { login: dto.login },
    });
    if (user) {
      return excludeField(user, ['password']);
    }

    const salt = parseInt(process.env.CRYPT_SALT);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const newUser = await prisma.user.create({
      data: {
        id: uuidv4(),
        login: dto.login,
        password: hashedPassword,
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

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    if (!user) {
      throw new HttpException('authentication failed', HttpStatus.FORBIDDEN);
    } else {
      const payload = {
        userId: user.id,
        login: user.login,
      };
      return {
        id: user.id,
        login: user.login,
        accessToken: this.jwt.sign(payload),
        refreshToken: this.jwt.sign(payload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    }
  }

  async refresh(dto: RefreshDto) {
    if (!dto.refreshToken) {
      throw new HttpException(
        'no refreshToken in body',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const refreshData = this.jwt.verify(dto.refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      const user = await prisma.user.findUnique({
        where: { id: refreshData.userId },
      });

      if (!user) throw new Error();
      const payload = {
        userId: user.id,
        login: user.login,
      };
      return {
        userId: user.id,
        login: user.login,
        accessToken: this.jwt.sign(payload),
        refreshToken: this.jwt.sign(payload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    } catch (error) {
      throw new HttpException(
        'Authentication failed (Refresh token is invalid or expired)',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async validateUser(data: LoginDto) {
    const user = await prisma.user.findFirst({
      where: { login: data.login },
    });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(data.password, user.password);
    if (passwordValid && user) return user;
    return null;
  }
}
