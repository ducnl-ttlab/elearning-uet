import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex/index';
import { IUserCourseData } from '../constants/course.interfaces';
import { UserCourseStatus } from '../constants/course.constants';

@Module({ dynamic: true, namespaced: true, store, name: 'course' })
class UserCourseModule extends VuexModule {
    userCourseData: IUserCourseData = {};
    favoriteCourse = false;

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
}
export const userCourseModule = getModule(UserCourseModule);
