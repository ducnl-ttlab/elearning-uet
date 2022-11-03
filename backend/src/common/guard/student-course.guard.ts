import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserCourseService } from 'src/modules/user-courses/service/user-course.service';

@Injectable()
export class JoinCourseGuard implements CanActivate {
  constructor(private readonly userCourse: UserCourseService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      user,
      params: { courseId },
    } = context.switchToHttp().getRequest();

    let isStudentInCourse = await this.userCourse.findOneByUsercourse(
      user.id,
      courseId,
    );
    return !isStudentInCourse;
  }
}
