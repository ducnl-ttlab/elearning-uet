import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteStory } from '../entity/favorite-story.entity';
import { FavoriteCategoryDto } from '../dto/favorite-category.dto';

@Injectable()
export class FavoriteStoryService {
  constructor(
    @InjectRepository(FavoriteStory)
    private readonly favoriteStory: Repository<FavoriteStory>,
  ) {}

  async createDevice(
    deviceId: string,
    storyId: number,
    isLike: boolean,
  ): Promise<FavoriteCategoryDto> {
    const { insertId } = await this.favoriteStory.query(
      `INSERT INTO favorite_stories(storyId, deviceId, isLike) VALUES (${storyId}, '${deviceId}', ${isLike}) ON DUPLICATE KEY UPDATE isLike = ${isLike}`,
    );
    const data: FavoriteCategoryDto = await this.favoriteStory.findOne({
      where: { id: insertId },
    });

    return data;
  }

  findDeviceDetail(deviceId: string, storyId: number): Promise<FavoriteStory> {
    return this.favoriteStory.findOne({ where: { deviceId, storyId } });
  }

  findAllDeviceStory(deviceId: string): Promise<[FavoriteStory[], number]> {
    return this.favoriteStory.findAndCount({
      where: { deviceId, isLike: true },
    });
  }
}
