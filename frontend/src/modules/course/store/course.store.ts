import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/plugins/vuex/index';
import {
    ICourseData,
    ICoursePreviewData,
    IQuizDetail,
    ITopicData,
} from '../constants/course.interfaces';
import {
    CourseArea,
    CourseListDisplayMode,
    SidebarMode,
} from '../constants/course.constants';

@Module({ dynamic: true, namespaced: true, store, name: 'course' })
class CourseModule extends VuexModule {
    courseList: Array<ICourseData> = [];
    courseListDisplayMode = CourseListDisplayMode.GRID;
    coursePreviewData: ICoursePreviewData = {};
    topicList: Array<ITopicData> = [];
    selectedTopic: ITopicData = this.topicList.length > 0 ? this.topicList[0] : {};
    topicSidebarMode = '';
    quizSidebarMode = '';
    courseArea = '';
    isShowTopicVideo = true;
    isShowTopicFormPopup = false;
    quizList: Array<IQuizDetail> = [];
    topicId = 1;

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

    @Action
    setCoursePreviewData(coursePreviewData: ICoursePreviewData) {
        this.SET_COURSE_PREVIEW_DATA(coursePreviewData);
    }

    @Mutation
    SET_COURSE_PREVIEW_DATA(coursePreviewData: ICoursePreviewData) {
        this.coursePreviewData = coursePreviewData;
    }

    @Action
    setTopicList(topicList: Array<ITopicData>) {
        this.SET_TOPIC_LIST(topicList || []);
    }

    @Mutation
    SET_TOPIC_LIST(topicList: Array<ITopicData>) {
        this.topicList = topicList;
    }

    @Action
    setSelectedTopic(index: number) {
        this.SET_SELECTED_TOPIC(index);
    }

    @Mutation
    SET_SELECTED_TOPIC(index: number) {
        this.selectedTopic = this.topicList[index - 1];
    }

    @Action
    setTopicSidebarMode(mode: string) {
        this.SET_TOPIC_SIDEBAR_MODE(mode);
    }

    @Mutation
    SET_TOPIC_SIDEBAR_MODE(mode: string) {
        this.topicSidebarMode = mode;
    }

    @Action
    setSelectedTopicObject(selectedTopic: ITopicData) {
        this.SET_SELECTED_TOPIC_OBJECT(selectedTopic);
    }

    @Mutation
    SET_SELECTED_TOPIC_OBJECT(selectedTopic: ITopicData) {
        this.selectedTopic = selectedTopic;
    }

    @Action
    toggleShowTopicVideo(visible: boolean) {
        this.TOGGLE_SHOW_TOPIC_VIDEO(visible);
    }

    @Mutation
    TOGGLE_SHOW_TOPIC_VIDEO(visible: boolean) {
        this.isShowTopicVideo = visible;
    }

    @Action
    toggleShowTopicFormPopup(visible: boolean) {
        this.TOGGLE_SHOW_TOPIC_FORM_POPUP(visible);
    }

    @Mutation
    TOGGLE_SHOW_TOPIC_FORM_POPUP(visible: boolean) {
        this.isShowTopicFormPopup = visible;
    }

    @Action
    setQuizSidebarMode(mode: string) {
        this.SET_QUIZ_SIDEBAR_MODE(mode);
    }

    @Mutation
    SET_QUIZ_SIDEBAR_MODE(mode: string) {
        this.quizSidebarMode = mode;
    }

    @Action
    setCourseArea(area: string) {
        this.SET_COURSE_AREA(area);
    }

    @Mutation
    SET_COURSE_AREA(area: string) {
        this.courseArea = area;
    }

    @Action
    setQuizList(quizList: Array<IQuizDetail>) {
        this.SET_QUIZ_LIST(quizList || []);
    }

    @Mutation
    SET_QUIZ_LIST(quizList: Array<IQuizDetail>) {
        this.quizList = quizList;
    }

    @Action
    setTopicId(topicId: number) {
        this.SET_TOPIC_ID(topicId);
    }

    @Mutation
    SET_TOPIC_ID(topicId: number) {
        this.topicId = topicId;
    }
}
export const courseModule = getModule(CourseModule);
