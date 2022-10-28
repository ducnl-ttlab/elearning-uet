import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './service/course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { CategoryModule } from '../category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), ConfigModule, CategoryModule],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}
