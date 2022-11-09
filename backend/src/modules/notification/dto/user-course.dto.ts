import { ApiProperty } from '@nestjs/swagger';

interface ItemCheckout {
  id: number;
  quantity: number;
}

export class CheckoutDto {
  @ApiProperty()
  items: ItemCheckout[];
}

export class CategoryDto {
  @ApiProperty()
  categoryId: number;
}

export class CourseDto {
  @ApiProperty()
  id: number;
}
