export const CourseListDisplayMode = {
    GRID: 'GRID',
    LIST: 'LIST',
};

export const MAX_COURSE_GRID_ITEMS = 20;
export const MAX_COURSE_LIST_ITEMS = 16;
export const DEFAULT_SELECTED_PAGE = 1;

export enum UserCourseStatus {
    STUDENT = 'student',
    ADMIN = 'admin',
    INSTRUCTOR = 'instructor',
    GUEST = 'guest',
    ACCEPTED = 'accepted',
    REJECTED = 'reject',
    EXPIRED = 'expired',
    PENDING = 'pending',
    COMMENT_BLOCKED = 'comment_blocking',
}
