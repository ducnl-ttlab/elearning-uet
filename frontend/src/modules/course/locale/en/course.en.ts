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
        getQuizListError: 'Error getting quiz list. Please try again later!',
        createNewQuizError: 'Error creating new quiz. Please try again later!',
        topic: {
            updateTopic: 'Update topic failed! Please try again later',
            createTopic: 'Create topic failed! Please try again later!',
            deleteTopic: 'Delete topic failed! Please try again later!',
        },
        emptyQuizList: 'This topic does not have any quiz yet.',
        sendMessageError: 'Cannot send message. Please try again later!',
        leaveRatingError: 'Leave rating error. Please try again later!',
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
        topic: {
            updateTopic: 'Update topic successfully!',
            createTopic: 'Create topic successfully!',
            deleteTopic: 'Delete topic successfully!',
        },
        quiz: {
            updateQuiz: 'Update quiz successfully!',
            createQuiz: 'Create quiz successfully!',
            deleteQuiz: 'Delete quiz successfully!',
        },
    },
    coursePopup: {
        showStudentList: 'Student List',
        showOutsideStudentList: 'Student List (not in course)',
    },

    studentListMode: {
        inside: 'Inside course',
        outside: 'Outside course',
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

    topic: {
        showVideo: 'Click here to show the video',
        hideVideo: 'Click here to hide the video',
        action: {
            createTitle: 'Create Topic',
            editTitle: 'Edit Topic',
            edit: 'Edit this Topic',
        },
        form: {
            title: 'Title',
            description: 'Description',
            content: 'Content',
            video: 'Upload video',
            delete: 'Delete',
            save: 'Save',
            cancel: 'Cancel',
        },
    },

    quiz: {
        form: {
            duration: '{time} minutes',
            mark: '{mark} points',
            addQuiz: 'Add a quiz',
            addQuestion: 'Add a question',
            addAnswer: 'Add an answer',
            title: 'Quiz Title',
            quizDuration: 'Duration',
            startDate: 'Start date',
            startTime: 'Start time',
            save: 'Save',
            cancel: 'Cancel',
        },
        field: {
            addQuestion: 'Question title',
            addAnswer: 'Answer title',
        },
    },

    chat: {
        title: 'Chat ',
        sendMessage: 'Send message...',
        defaultSelect: 'Course',
    },
    comment: {
        hidden: 'This comment is marked as sensitive. Click on the eye icon to reveal',
        instructor: ' (Instructor)',
        commentBlocked:
            'You have beeN blocked from commentting. Please contact the instructor.',
    },
};
