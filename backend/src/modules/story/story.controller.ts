import { Controller, Get } from '@nestjs/common';
import { SearchService } from '../search/search.service';

@Controller('story')
export class StoryController {
  constructor(private readonly searchService: SearchService) {
    //
  }

  @Get()
  a() {
    return this.searchService.CreateDoctorIndex();
  }
}
