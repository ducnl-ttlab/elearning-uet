import { CourseStudentList } from './../dto/user-course.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentCourseDto } from '../dto/user-course.dto';
import { UserCourse } from '../entity/user-course.entity';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(UserCourse)
    private readonly usercourse: Repository<UserCourse>,
  ) {}

  async saveUserCourse(userCourse: Partial<UserCourse>): Promise<UserCourse> {
    try {
      return this.usercourse.save(userCourse);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteUserCourse(id: number) {
    try {
      return this.usercourse.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateUserCourse(id: number, properties: Partial<UserCourse>) {
    try {
      let result = await this.usercourse.save({
        ...properties,
        id,
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: number): Promise<UserCourse> {
    try {
      return this.usercourse.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getStudentList(courseId: number): Promise<CourseStudentList[]> {
    try {
      let query = `
      SELECT uc.userId, u.username, u.email, u.avatar, uc.startCourseTime, uc.status
      FROM user_courses uc
      JOIN users u 
      ON u.id = uc.userId
      WHERE uc.courseId = ?
       `;

      return this.usercourse.query(query, [courseId]);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findCoursesByUserId(userId: string): Promise<StudentCourseDto[]> {
    try {
      let query = `
      SELECT uc.id, uc.status, uc.startCourseTime, uc.blockDuration, r.rating, c.*
      FROM user_courses uc 
      LEFT JOIN (
          SELECT c.id as courseId, c.name as courseName, u.username as instructorName, c.price, c.image, c.startCourseTime as beginCourseTime, c.endCourseTime
          FROM courses c
          JOIN users u ON u.id = c.instructorId
      ) as c on c.courseId = uc.courseId
      LEFT JOIN ratings r on r.userCourseId = uc.id
      WHERE uc.userId = ?;
      `;
      return this.usercourse.query(query, [userId]);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneByUsercourse(
    userId: string,
    courseId: number,
  ): Promise<UserCourse> {
    try {
      return this.usercourse.findOne({
        where: {
          userId,
          courseId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async existUserCourse(courseId: number, userId: string): Promise<UserCourse> {
    let existCourse = await this.findOneByUsercourse(userId, courseId);
    if (!existCourse) {
      throw new NotFoundException('Not found student in this course');
    }
    return existCourse;
  }
}
