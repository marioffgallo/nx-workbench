import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../../common/strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: 'AUTHENTICATION-MS',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
      {
        name: 'DATABASE-MS',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [JwtStrategy],
})
export class UsersModule {}
