import { CategoryDto } from '../dto/category.dto';
import { CommonListResponse } from 'src/common/helpers/api.response';

export class CategoryListResponse extends CommonListResponse<CategoryDto> {}
