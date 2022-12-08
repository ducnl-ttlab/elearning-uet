import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex/index';
import {
    IInstructorData,
    INotificationData,
    NotificationType,
} from '../constants/common.interfaces';

@Module({ dynamic: true, namespaced: true, store, name: 'authLogin' })
class CommonModule extends VuexModule {
    instructorList: Array<IInstructorData> = [];
    notificationList: Array<INotificationData> = [];
    showLoadingIndicator = false;

    @Action
    setInstructorList(instructorList: Array<IInstructorData>) {
        this.SET_INSTRUCTOR_LIST(instructorList || []);
    }

    @Mutation
    SET_INSTRUCTOR_LIST(instructorList: Array<IInstructorData>) {
        this.instructorList = instructorList;
    }

    @Action
    setNotificationList(notificationList: Array<INotificationData>) {
        this.SET_NOTIFICATION_LIST(notificationList || []);
    }

    @Action
    setJoinCourseNotification(notificationId: number) {
        const notifications = this.notificationList.map((item) => {
            const { type, id } = item;
            return {
                ...item,
                type: notificationId === id ? NotificationType.studentJoinCourse : type,
            };
        });
        this.SET_NOTIFICATION_LIST(notifications || []);
    }

    @Mutation
    SET_NOTIFICATION_LIST(notificationList: Array<INotificationData>) {
        this.notificationList = notificationList;
    }

    @Action
    setLoadingIndicator(showLoadingIndicator: boolean) {
        this.SET_SHOW_LOADING_INDICATOR(showLoadingIndicator);
    }

    @Mutation
    SET_SHOW_LOADING_INDICATOR(showLoadingIndicator: boolean) {
        this.showLoadingIndicator = showLoadingIndicator;
    }
}
export const commonModule = getModule(CommonModule);
