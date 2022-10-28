import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { SearchService } from '../search/search.service';
import { Cache } from 'cache-manager';
import { RedisCacheService } from '../cache/redis-cache.service';

@Controller('story')
export class StoryController {
  constructor(
    private readonly searchService: SearchService,
    private readonly cacheManager: RedisCacheService,
  ) {}

  @Get()
  a() {
    return this.searchService.CreateDoctorIndex();
  }
}
