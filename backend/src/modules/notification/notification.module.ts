import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './service/notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationCourse } from './entity/user-course.entity';
import { CategoryModule } from '../category/category.module';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationCourse]),
    CategoryModule,
    CourseModule,
    UserModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
