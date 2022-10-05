import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UsePipes,
  Headers,
  Req,
  Param,
  Res,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { Response, Request } from 'express';
import _ = require('lodash');
import { StoryCategoryDto } from './dto/story-category.dto';
import {
  SuccessResponse,
  ErrorResponse,
} from 'src/common/helpers/api.response';
import { QueryListSToryDTO } from './dto/api.request.dto';
import { FavoriteStoryService } from '../favorite-story/service/favorite-story.service';
import { StoryCategoryService } from './service/story-category.service';
import {
  ParamValidation,
  QueryValidation,
} from 'src/common/pipe/joi.request.pipe';
import { LikeValidation } from './pipe/joi.request.pipe';
import { FavoriteCategoryResponse } from '../favorite-story/dto/api-response.dto';
import { StoryService } from '../story/service/story.service';
import { StoryDetailsResponse } from '../story/dto/api.response';

@Controller('story')
export class StoryCategoryController {
  constructor(
    private readonly storyCategoryService: StoryCategoryService,
    private readonly favoriteStoryService: FavoriteStoryService,
    private readonly storyService: StoryService,
  ) {}

  @Get()
  @UsePipes(QueryValidation)
  async getAll(
    @Query() query: QueryListSToryDTO,
    @Headers('deviceId') deviceId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const {
      categoryIds,
      limit,
      page,
      orderBy,
      isHot,
      isLike,
      isUniqueCategory,
    } = query;

    if (!deviceId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(HttpStatus.BAD_REQUEST, 'Not Found Device'));
    }
    let idList = [];
    if (categoryIds) {
      idList = categoryIds.split(',').map((id) => Number(id));
    }
    const [deviceStories, totalDeviceStory] =
      await this.favoriteStoryService.findAllDeviceStory(deviceId);

    const stories = this.storyCategoryService.findStoryByCategoryIds(
      idList,
      { limit, page, orderBy },
      isHot,
      isUniqueCategory,
    );

    const promiseResult = await Promise.all([deviceStories, stories]);

    const storyLike = _.mapValues(
      _.keyBy(promiseResult[0], 'storyId'),
      'isLike',
    );

    let storyCategories: StoryCategoryDto[];

    storyCategories = promiseResult[1].items.map((story) => {
      return {
        ...story,
        isLike: storyLike[story.storyId] || false,
        image: `http://${req.headers.host}/image/${story.image}`,
      };
    });
    if (`${isLike}` === 'true') {
      storyCategories = storyCategories.filter(
        (story) => story.isLike === true,
      );
      promiseResult[1].totalItems = totalDeviceStory;
    }

    promiseResult[1].items = storyCategories;

    return res
      .status(HttpStatus.OK)
      .json(new SuccessResponse(promiseResult[1]));
  }

  @Patch(':storyId')
  @UsePipes(ParamValidation, LikeValidation)
  async updateLike(
    @Param('storyId') storyId: number,
    @Query('isLike') isLike: boolean,
    @Headers('deviceId') deviceId: string,
    @Res() res: Response,
  ) {
    try {
      if (!deviceId) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(new ErrorResponse(400, 'Not Found Device'));
      }

      const favoriteStory = await this.favoriteStoryService.createDevice(
        deviceId,
        storyId,
        isLike,
      );

      const response: FavoriteCategoryResponse = {
        code: HttpStatus.CREATED,
        data: favoriteStory,
        message: 'success',
      };

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  @UsePipes(ParamValidation)
  async getDetails(
    @Param('id') storyId: number,
    @Headers('deviceId') deviceId: string,
    @Res() res: Response,
  ) {
    if (!deviceId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(400, 'Not Found Device'));
    }

    const favoriteDevice = this.favoriteStoryService.findDeviceDetail(
      deviceId,
      storyId,
    );
    const storyDetail = this.storyService.getDetails(storyId);

    const promiseResult = await Promise.all([favoriteDevice, storyDetail]);

    const defaultDevice = {
      storyId,
      deviceId,
      isLike: false,
    };

    if (promiseResult[0]) {
      defaultDevice.isLike = promiseResult[0].isLike;
    }

    const responseData = {
      ...defaultDevice,
      ...promiseResult[1],
    };

    const response: StoryDetailsResponse = {
      code: HttpStatus.OK,
      data: responseData,
      message: 'success',
    };

    return res.status(HttpStatus.OK).json(response);
  }
}
