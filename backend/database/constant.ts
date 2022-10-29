export enum TableName {
  category = 'categories',
  story = 'stories',
  storyCategory = 'story_categories',
  favoriteStory = 'favorite_stories',
  user = 'users',
  course = 'courses',
  userCourse = 'user_courses',
}

export enum Role {
  student = 'student',
  instructor = 'instructor',
  admin = 'admin',
  guess = 'guess',
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
}
