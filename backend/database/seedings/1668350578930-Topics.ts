import { TableName } from '../constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Topics1668350578930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        id: 1,
        video: 'https://streaming-cms-tpo-te-vnno-zn-14.epicdn.me/384dcb300d131834e2189387a2e0c50d/638c34b0/2022_12_03/crop_video_files_online_cavani_punches_var_twitter_search_twittermp4_2496.mp4',
        courseId: 1,
        name: 'React reactive',
        description: 'Làm chủ react native',
        content:
          'React Native lets you create truly native apps and doesn"t compromise your users" experiences. It provides a core set of platform agnostic native components like View, Text, and Image that map directly to the platform’s native UI building blocks.',
      },
      {
        id: 2,
        video: 'https://streaming-cms-tpo-te-vnno-zn-14.epicdn.me/384dcb300d131834e2189387a2e0c50d/638c34b0/2022_12_03/crop_video_files_online_cavani_punches_var_twitter_search_twittermp4_2496.mp4',
        courseId: 1,
        name: 'Computer Vision',
        description: 'Tiếp cận Computer Vision',
        content:
          'This course provides an introduction to computer vision including fundamentals of image formation, camera imaging geometry, feature detection and matching, multiview geometry including stereo, motion estimation and tracking, and classification',
      },
      {
        id: 3,
        video: 'https://streaming-cms-tpo-te-vnno-zn-14.epicdn.me/384dcb300d131834e2189387a2e0c50d/638c34b0/2022_12_03/crop_video_files_online_cavani_punches_var_twitter_search_twittermp4_2496.mp4',
        courseId: 3,
        name: 'Natural Language Processing',
        description: 'Tiếp cận Natural Language Processing',
        content:
          'Natural language processing (NLP) and text mining are the art and science of extracting insights from large amounts of natural language. The course topics covered help students add natural language processing techniques to their research, business, and data science toolset.',
      },
      {
        id: 4,
        video: 'https://streaming-cms-tpo-te-vnno-zn-14.epicdn.me/384dcb300d131834e2189387a2e0c50d/638c34b0/2022_12_03/crop_video_files_online_cavani_punches_var_twitter_search_twittermp4_2496.mp4',
        courseId: 3,
        name: 'Neural Network',
        description: 'Làm chủ Neural Network',
        content:
          'Artificial neural networks learn by detecting patterns in huge amounts of information. Much like your own brain, artificial neural nets are flexible, data-processing machines that make predictions and decisions.',
      },
      {
        id: 5,
        video: 'https://streaming-cms-tpo-te-vnno-zn-14.epicdn.me/384dcb300d131834e2189387a2e0c50d/638c34b0/2022_12_03/crop_video_files_online_cavani_punches_var_twitter_search_twittermp4_2496.mp4',
        courseId: 3,
        name: 'Yolo Detect Objection',
        description: 'Nắm vững bản chất của Yolo',
        content:
          'YOLO is an algorithm that uses neural networks to provide real-time object detection. This algorithm is popular because of its speed and accuracy. It has been used in various applications to detect traffic signals, people, parking meters, and animals.',
      },
    ];

    await queryRunner.manager.getRepository(TableName.topic).insert(items);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
