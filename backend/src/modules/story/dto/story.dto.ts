export interface DeviceStoryDetailsDto {
  name: string;
  content: string;
  isHot: boolean;
  storyId: number;
  deviceId: string;
  isLike: boolean;
}
export interface StoryNameDto {
  name: string;
}

export interface StoryDetailsDto extends StoryNameDto {
  content: string;
  isHot: boolean;
}
