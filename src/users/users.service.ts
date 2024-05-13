import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UsersDTO } from './users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
    this.initializeAdminUser();
  }
  private async initializeAdminUser() {
    const userCount = await this.prisma.user.count();

    if (userCount === 0) {
      const adminData: UsersDTO = {
        id: '',
        email: 'admin@admin',
        name: 'Admin',
        username: 'admin',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await this.create(adminData);
    }
  }
  async create(data: UsersDTO) {
    const hashedPassword = await this.hashPassword(data.password);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
  async update(id: string, data: UsersDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (data.password) {
      const hashedPassword = await this.hashPassword(data.password);

      data = {
        ...data,
        password: hashedPassword,
      };
    }

    await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }
  async delete(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string): Promise<UsersDTO | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID '${id}' não encontrado.`);
    }

    return user;
  }

  async findByUsername(username: string): Promise<UsersDTO | undefined> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
  async userExistsByUsername(username: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    return !!user;
  }
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
