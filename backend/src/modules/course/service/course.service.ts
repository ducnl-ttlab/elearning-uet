import { UserService } from 'src/modules/user/service/user.service';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Course } from '../entity/course.entity';
import { TableName } from 'database/constant';
import { CourseSearch } from '../dto/course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly course: Repository<Course>,
    private readonly user: UserService,
  ) {}

  async saveCourse(course: Partial<Course>): Promise<Course> {
    try {
      return this.course.save(course);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findInstructorCourse(
    instructorId: string,
    keyword?: string,
  ): Promise<Course[]> {
    try {
      let c = TableName.course;
      let queryKeywork = keyword ? `and ${c}.name LIKE "%${keyword}%"` : '';
      console.log('o', queryKeywork);
      let query = `SELECT *
       FROM ${c}
       WHERE ${c}.instructorId = "${instructorId}" ${queryKeywork}`;

      return this.course.query(query);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: number): Promise<Course> {
    try {
      return this.course.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findCourseList(): Promise<[Course[], number]> {
    try {
      return this.course.findAndCount();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findCourses(
    categoryId?: number,
    text?: string,
    rating?: number,
  ): Promise<CourseSearch[]> {
    try {
      let where = ((categoryId || text || rating) && 'where ') || '';
      let category = (categoryId && `c.categoryId = ${categoryId}`) || '';
      let categoryJoin = (categoryId && text && ' and') || '';
      let keyword = (text && `c.name like '%${text}%'`) || '';

      let rate = (rating && `uc.avgRating > ${rating}`) || '';
      let keywordJoin = (text && rating && ' and') || '';

      let query = `
      SELECT c.id, c.categoryId, c.name, c.image, c.price, c.description, u.username as instructorName, uc.avgRating, uc.studentTotal, c.startCourseTime as startCourse, c.endCourseTime as endCourse  
      FROM courses c
      JOIN users u on u.id = c.instructorId
      LEFT JOIN ( 
        SELECT c.id, AVG(CAST(r.rating AS UNSIGNED)) as avgRating, COUNT(uc.id) as studentTotal FROM courses c
          LEFT JOIN user_courses uc on uc.courseId = c.id and uc.status <> 'expired' and uc.status <> 'reject'
          LEFT JOIN ratings r on r.userCourseId = uc.id 
          GROUP BY c.id
      ) as uc on uc.id = c.id
      ${where}${category} ${categoryJoin} ${keyword} ${keywordJoin} ${rate}
      `;
      let result = await this.course.query(query);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCourseInstrutor(id: string): Promise<User> {
    return this.user.findOneById(id);
  }

  async existCourse(id: number): Promise<Course> {
    let existCourse = await this.findOneById(id);
    if (!existCourse) {
      throw new NotFoundException('Not found course');
    }
    return existCourse;
  }

  async deleteCourse(id: number): Promise<DeleteResult> {
    try {
      return this.course.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
