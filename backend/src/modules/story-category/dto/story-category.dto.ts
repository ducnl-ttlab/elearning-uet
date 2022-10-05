export interface StoryCategoryDto {
  id: number;
  categoryId: number;
  storyId: number;
  name: string;
  content: string;
  isHot: boolean;
  image: string;
  isLike: boolean;
}
import * as Joi from 'joi';

export const likeSchema = Joi.object().keys({
  isLike: Joi.boolean().required(),
});
