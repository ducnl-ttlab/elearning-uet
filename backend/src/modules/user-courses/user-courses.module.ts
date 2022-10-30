import { Module } from '@nestjs/common';
import { UserCourseController } from './user-courses.controller';
import { UserCourseService } from './service/user-course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCourse } from './entity/user-course.entity';
import { CategoryModule } from '../category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([UserCourse]), CategoryModule],
  controllers: [UserCourseController],
  providers: [UserCourseService],
  exports: [UserCourseService],
})
export class UserCourseModule {}
