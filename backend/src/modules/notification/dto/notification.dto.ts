import { CommentType, NotificationType } from 'database/constant';
import { CommonListResponse } from 'src/common/helpers/api.response';

export interface NotificationDto {
  id: number;
  userId: string;
  type: NotificationType;
  sourceId: string;
  parentId: string;
  isRead: boolean;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
export class NotificationListResponse extends CommonListResponse<NotificationDto> {}

export interface QueryNotificationDto {
  page: string;
  pageSize: string;
}

export interface CommentNotification {
  commentType: CommentType;
  userId: string;
  courseOrTopicId: number;
  username: string;
}
