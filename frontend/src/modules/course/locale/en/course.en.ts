export const course = {
    course: {
        price: '${price}',
        free: 'Free',
        rating: 'Rating:\xa0',
        instructor: 'Instructor: {instructor}',
        notRated: 'Not rated',
        studentTotal: 'Attenders: {studentTotal}',
        ratingList: {
            five: '5 stars',
            four: 'From 4 stars',
            three: 'From 3 stars',
            two: 'From 2 stars',
            one: 'From 1 stars',
            none: 'All',
        },
        createCourse: 'Create Course',
        active: 'Activate course',
        inactive: 'Suspend course',
        title: 'Course name',
        placeholder: 'Enter a course name',
        selectCategory: 'Course Category',
        description: 'Description',
        coursePrice: 'Course prices',
        startDate: 'Start date',
        endDate: 'End date',
        dateRange: 'Course date range',
        courseImage: 'Course image',
        actionList: {
            goToCourse: 'Join the course.',
            notOwnedCourse: 'This course belongs to another instructor.',
            rejectedCourse: 'You have been blocked from this course.',
            pendingCourse: 'Waiting the instructor to approve your request.',
            expiredCourse: 'The course has been expired.',
        },
    },

    filters: {
        title: 'Course Sort:\xa0',
        keyword: 'Keyword',
        rating: 'Rating',
        category: 'Category',
        instructor: 'Instructor',
        apply: 'Filter',
    },

    table: {
        title: 'Title',
        description: 'Description',
        rating: 'Rating',
        instructor: 'Instructor:\xa0 {instructor}',
        studentCount: 'Attendee',
        price: 'Price',
    },

    preview: {
        content: 'Course Content',
    },

    errors: {
        emptyCourseList: 'Cannot find any course.',
        emptyTopicList: 'Cannot find any topic.',
        courseRejected: 'You have been blocked by the instructor.',
        declinedPayment: 'Payment declined. Please try again later.',
        getStudentListError: 'Get student list failed. Please try again later.',
        emptyStudentList: 'Cannot find any student.',
        getTopicListError: 'Cannot find any topic',
    },
    success: {
        favoriteCourse: {
            add: 'Successfully added this course to your favorite list.',
            remove: 'Successfully removed this course from your favorite list.',
        },
        courseCheckout: {
            freeCourse:
                'You have sent a request to join the course.Please kindly wait for the instructor to approve',
            paidCourse: 'Please complete the checkout',
            successPayment:
                'You have successfully bought this course. Please go back to the course page',
        },
    },
    coursePopup: {
        showStudentList: 'Student List',
        showOutsideStudentList: 'Student List (not in course)',
    },

    studentListMode: {
        inside: 'Trong khóa học',
        outside: 'Ngoài khóa học',
        invite: 'Invite',
    },

    courseSidebar: {
        courseDetail: 'Course Details',
        quiz: 'Quizzes',
        studentList: 'Student List',
    },

    topicSidebar: {
        title: 'Topic List',
        addTopic: 'Add new topic',
    },
};
