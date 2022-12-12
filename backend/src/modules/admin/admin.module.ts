import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './service/admin.service';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';
import { RedisCacheService } from '../cache/redis-cache.service';
import { UserCourseModule } from '../user-courses/user-courses.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    CourseModule,
    UserModule,
    AuthModule,
    UserCourseModule,
    NotificationModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, RedisCacheService, AdminService],
  exports: [AdminService],
})
export class AdminModule {}
