export const course = {
    course: {
        price: '${price}',
        free: 'Miễn phí',
        instructor: 'Giảng viên: {instructor}',
        rating: 'Đánh giá:\xa0',
        notRated: 'Chưa có đánh giá',
        studentTotal: 'Số học viên: {studentTotal}',
        ratingList: {
            five: '5 sao',
            four: '4 sao trở lên',
            three: '3 sao trở lên',
            two: '2 sao trở lên',
            one: '1 sao trở lên',
            none: 'Tất cả',
        },
        createCourse: 'Tạo khóa học',
        active: 'Kích hoạt khóa học',
        inactive: 'Tạm ngừng khóa học',
        title: 'Tên khóa học',
        placeholder: 'Nhập tên khóa học',
        selectCategory: 'Thể loại khóa học',
        description: 'Mô tả',
        coursePrice: 'Giá tiền khóa học',
        startDate: 'Ngày bắt đầu',
        endDate: 'Ngày kết thúc',
        dateRange: 'Thời Gian khóa học',
        courseImage: 'Ảnh khóa học',
        actionList: {
            goToCourse: 'Vào khóa học',
            notOwnedCourse: 'Khóa học này của giảng viên khác',
            rejectedCourse: 'Bạn đã bị chặn khỏi khóa học này.',
            pendingCourse: 'Đã gửi yêu cầu tham gia khóa học',
            expiredCourse: 'Khóa học đã kết thúc.',
        },
    },

    filters: {
        title: 'Lọc khóa học\xa0',
        keyword: 'Từ khóa',
        rating: 'Đánh giá',
        category: 'Danh mục',
        instructor: 'Giảng viên',
        apply: 'Lọc',
    },

    table: {
        title: 'Tên khóa học',
        description: 'Mô tả',
        rating: 'Đánh giá',
        instructor: 'Giảng viên',
        studentCount: 'Số học viên',
        price: 'Giá',
    },

    preview: {
        content: 'Nội dung khóa học',
    },

    errors: {
        emptyCourseList: 'Không tìm thấy khóa học nào theo bộ lọc.',
        emptyTopicList: 'Không tìm thấy chủ đề nào.',
        courseRejected: 'Bạn đã bị giảng viên chặn khỏi khóa học.',
        declinedPayment: 'Thanh toán thất bại, xin vui lòng thử lại',
        notLoggedIn: 'Vui lòng đăng nhập trước',
        getStudentListError:
            'Xảy ra lỗi khi lấy danh sách học viên. Xin vui lòng thử lại sau',
    },

    success: {
        favoriteCourse: {
            add: 'Bạn đã thêm khóa học này vào danh sách yêu thích',
            remove: 'Bạn đã xóa khóa học này khỏi danh sách yêu thích.',
        },
        courseCheckout: {
            freeCourse:
                'Đã gửi yêu cầu tham gia khóa học tới giảng viên. Xin hãy chờ phê duyệt',
            paidCourse: 'Vui lòng tiến hành thanh toán',
            successPayment: 'Bạn đã thanh toán thành công, vui lòng trở lại khóa học',
        },
    },

    courseDetail: {
        showStudentList: 'Danh sách học viên',
    },
};
