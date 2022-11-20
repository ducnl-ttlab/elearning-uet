export enum TableName {
  category = 'categories',
  story = 'stories',
  storyCategory = 'story_categories',
  favoriteStory = 'favorite_stories',
  user = 'users',
  course = 'courses',
  userCourse = 'user_courses',
  notification = 'notifications',
  topics="topics",
  comments="comments"
}

export enum Role {
  student = 'student',
  instructor = 'instructor',
  admin = 'admin',
  guest = 'guest',
  pending = 'pending'
}

export enum Provider {
  google = 'google',
  local = 'local',
}

export enum UserCourseStatus {
  pending = 'pending',
  accepted = 'accepted',
  reject = 'reject',
  expired = 'expired',
  commentBlocking = 'comment_blocking'
}

export enum NotificationType {
  studentInvitation = 'student_invitation',
  topicCreation = 'topic_createion',
  homework = 'homework',
  comment = 'comment',
  rating = 'rating',
  quiz = 'quiz',
}
