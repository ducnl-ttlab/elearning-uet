import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex/index';
import {
    ICourseData,
    IStudentCourseData,
    IUserCourseData,
} from '../constants/course.interfaces';
import { CourseListDisplayMode } from '../constants/course.constants';

@Module({ dynamic: true, namespaced: true, store, name: 'course' })
class UserCourseModule extends VuexModule {
    userCourseData: IUserCourseData = {};
    favoriteCourse = false;
    userCourseListDisplayMode = CourseListDisplayMode.GRID;
    instructorCourseList: Array<ICourseData> = [];
    studentCourseList: Array<IStudentCourseData> = [];

    @Action
    setUserCourseData(userCourseData: IUserCourseData) {
        this.SET_USER_COURSE_DATA(userCourseData || {});
    }

    @Mutation
    SET_USER_COURSE_DATA(userCourseData: IUserCourseData) {
        this.userCourseData = userCourseData;
    }

    @Action
    setFavoriteCourse(favoriteCourse: boolean) {
        this.SET_FAVORITE_COURSE(favoriteCourse);
    }

    @Mutation
    SET_FAVORITE_COURSE(favoriteCourse: boolean) {
        this.favoriteCourse = favoriteCourse;
    }

    @Action
    setUserCourseListDisplayMode(mode: string) {
        this.SET_USER_COURSE_LIST_DISPLAY_MODE(mode);
    }

    @Mutation
    SET_USER_COURSE_LIST_DISPLAY_MODE(mode: string) {
        this.userCourseListDisplayMode = mode;
    }

    @Action
    setInstructorCourseList(instructorCourseList: Array<ICourseData>) {
        this.SET_INSTRUCTOR_COURSE_LIST(instructorCourseList || []);
    }

    @Mutation
    SET_INSTRUCTOR_COURSE_LIST(instructorCourseList: Array<ICourseData>) {
        this.instructorCourseList = instructorCourseList;
    }

    @Action
    setStudentCourseList(studentCourseList: Array<IStudentCourseData>) {
        this.SET_STUDENT_COURSE_LIST(studentCourseList || []);
    }

    @Mutation
    SET_STUDENT_COURSE_LIST(studentCourseList: Array<IStudentCourseData>) {
        this.studentCourseList = studentCourseList;
    }
}
export const userCourseModule = getModule(UserCourseModule);
