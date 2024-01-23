import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwtConfig from './configuration/jwt.config';
import databaseConfig from './configuration/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(databaseConfig()),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
