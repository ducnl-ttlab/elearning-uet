import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex/index';
import { ICourseData } from '../constants/course.interfaces';
import { CourseListDisplayMode } from '../constants/course.constants';

@Module({ dynamic: true, namespaced: true, store, name: 'course' })
class CourseModule extends VuexModule {
    courseList: Array<ICourseData> = [];
    courseListDisplayMode = CourseListDisplayMode.GRID;

    @Action
    setCourseList(courseList: Array<ICourseData>) {
        this.SET_COURSE_LIST(courseList || []);
    }

    @Mutation
    SET_COURSE_LIST(courseList: Array<ICourseData>) {
        this.courseList = courseList;
    }

    @Action
    setCourseListDisplayMode(mode: string) {
        this.SET_COURSE_LIST_DISPLAY_MODE(mode);
    }

    @Mutation
    SET_COURSE_LIST_DISPLAY_MODE(mode: string) {
        this.courseListDisplayMode = mode;
    }
}
export const courseModule = getModule(CourseModule);
