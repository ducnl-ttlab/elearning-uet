import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    setTimeout(() => {
      console.log(
        'redis',
        (this.cacheManager.store as any)?.getClient()?.address,
      );
    }, 1300);
  }

  async set(key: string, value: string) {
    return this.cacheManager.set(key, value, { ttl: 0 });
  }

  async get(key: string): Promise<string> {
    return this.cacheManager.get(key);
  }

  async resetAll(): Promise<void> {
    return this.cacheManager.reset();
  }

  async deleteByKey(key: string): Promise<unknown> {
    return this.cacheManager.del(key);
  }
}
