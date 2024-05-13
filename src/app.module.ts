import { Module } from '@nestjs/common';
import * as ConfigEnv from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ContactModule } from './contact/contact.module';
import { ImoveisModule } from './imoveis/imoveis.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path/posix';
import { ImagensModule } from './imagens/imagens.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/imoveis',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    ConfigEnv.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule,
    AuthModule,
    ContactModule,
    ImoveisModule,
    ImagensModule,
    ClientModule,
  ],
})
export class AppModule { }