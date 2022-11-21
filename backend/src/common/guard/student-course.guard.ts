import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role, UserCourseStatus } from 'database/constant';
import { CourseService } from 'src/modules/course/service/course.service';
import { UserCourseService } from 'src/modules/user-courses/service/user-course.service';
import { IUserJwt, IVerifyUserJwt } from '../interfaces';

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

@Injectable()
export class CourseGuard implements CanActivate {
  constructor(
    private readonly userCourse: UserCourseService,
    private readonly course: CourseService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const {
      user,
      params: { courseId },
    }  = request

    if (user.role === Role.student) {
      let studentInCourse = await this.userCourse.findOneByUsercourse(
        user.id,
        courseId,
      );
      let studentAccepted = [
        UserCourseStatus.accepted,
        UserCourseStatus.commentBlocking,
      ];
      let isStudentInCourse = studentAccepted.includes(studentInCourse.status);

      request.userCourse = studentInCourse
      
      return isStudentInCourse;
    } else if (user.role === Role.instructor) {
      let courseInstructor = await this.course.findOneById(courseId); 
      let isInstructorCourse = courseInstructor.instructorId === user.id;
      request.instructorCourse = courseInstructor
      return isInstructorCourse;
    }
    return true;
  }
}
