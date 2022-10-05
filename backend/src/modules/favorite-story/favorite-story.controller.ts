import { Controller } from '@nestjs/common';

import { FavoriteStoryService } from './service/favorite-story.service';

@Controller('category')
export class FavoriteStoryController {
  constructor(private readonly categoryService: FavoriteStoryService) {}
}
