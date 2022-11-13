import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/redis.module';
import { RedisCacheModule } from '../cache/redis-cache.module';
import { JWTModule } from '../jwt/jwt.module';
import { PollGateway } from './poll.gateway';
import { PollService } from './poll.service';

@Module({
  imports: [RedisCacheModule, ConfigModule, JWTModule, RedisModule],
  controllers: [],
  providers: [PollGateway, PollService],
  exports: [],
})
export class PollModule {}
