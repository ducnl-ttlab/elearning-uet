import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { timeStampToMysql } from 'src/common/ultils';
import { UserAnswerService } from 'src/modules/user-answer/service/user-answer.service';
import { getConnection, Repository } from 'typeorm';
import { BulkQuizInsertDto, BulkQuizResponseDto, IQuestion } from '../dto/dto';
import { Answer } from '../entity/answer.entity';
import { Question } from '../entity/question.entity';
import { Quiz } from '../entity/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quiz: Repository<Quiz>,
    @InjectRepository(Question)
    private readonly question: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answer: Repository<Answer>,
    private readonly userAnswer: UserAnswerService,
  ) {}

  async saveQuiz(quiz: Partial<Quiz>): Promise<Quiz> {
    try {
      return this.quiz.save(quiz);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async saveQuizBulk(quizBulk: BulkQuizInsertDto, topicId: number) {
    const { questionList, name, startTime, shown, duration } = quizBulk;
    let newQuiz = {
      topicId: +topicId,
      name,
      shown,
      startTime: timeStampToMysql(startTime),
      duration: +duration,
    };

    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      let quiz: BulkQuizResponseDto = await this.quiz.save(newQuiz);
      if (!questionList?.length) {
        return quiz;
      }
      let questions = await Promise.all([
        ...questionList?.map(async (questionItem) => {
          let { name, mark, answerList } = questionItem;

          let newQuestion = {
            quizId: quiz.id,
            name,
            mark: +mark,
          };
          let question: IQuestion = await this.question.save(newQuestion);
          if (!answerList?.length) {
            return question;
          }
          let answer = await Promise.all([
            ...answerList?.map(async (answerItem) => {
              const { isCorrect, content } = answerItem;

              let newAnswer = {
                isCorrect,
                content,
                questionId: question.id,
              };

              let answer = await this.answer.save(newAnswer);
              return answer;
            }),
          ]);

          question.answerList = answer;
          return question;
        }),
      ]);
      quiz.questionList = questions;
      await queryRunner.commitTransaction();
      return quiz;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async getQuizsByTopicId(topicId: number) {
    try {
      return this.quiz.find({
        where: { topicId: topicId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getBulks(topicId: number, studentId: string) {
    try {
      let quiz: BulkQuizResponseDto[] = await this.quiz.find({
        where: { topicId: topicId },
      });
      quiz = await Promise.all(
        quiz.map(async (quizItem) => {
          let questions: IQuestion[] = await this.question.find({
            where: { quizId: quizItem.id },
          });

          let questionList = await Promise.all([
            ...questions.map(async (questionItem) => {
              let answers = await this.answer.find({
                where: { questionId: questionItem.id },
              });
              let userAnswers: number[];
              if (studentId) {
                let ids = await this.userAnswer.getUserAnswerByQuestionId(
                  questionItem.id,
                );
                userAnswers = ids;
              }
              return {
                ...questionItem,
                answerList: answers,
                userAnswers,
              };
            }),
          ]);

          quizItem.questionList = questionList;
          return { ...quizItem };
        }),
      );

      return quiz;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: number): Promise<Quiz> {
    try {
      return this.quiz.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateQuiz(quiz: BulkQuizInsertDto) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    let { questionList, ...newQuiz } = quiz;

    try {
      await this.quiz.update(quiz.id, newQuiz);

      let question = await Promise.all(
        questionList.map((item) => {
          return this.updateQuestion(item);
        }),
      );
      await queryRunner.commitTransaction();
      return {
        questionList: question,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async updateQuestion(question: IQuestion) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    let { answerList, ...newQuestion } = question;
    try {
      let questionId: number;
      if (question.id) {
        await this.question.update(question.id, newQuestion);
      } else {
        questionId = (await this.question.save(newQuestion)).id;
      }

      let answers = await Promise.all(
        answerList.map((item) => {
          return this.updateAnswer(item, questionId);
        }),
      );
      await queryRunner.commitTransaction();
      return {
        answerList: answers,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async updateAnswer(answer: Answer, questionId?: number) {
    try {
      if (!answer.id) {
        let newAnswer = {
          questionId,
          ...answer,
        };
        return this.answer.save(newAnswer);
      } else {
        return this.answer.update(answer.id, answer);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async existQuiz(id: number): Promise<Quiz> {
    let existQuiz = await this.findOneById(id);
    if (!existQuiz) {
      throw new NotFoundException('Not found Quiz');
    }
    return existQuiz;
  }

  async getAnswerList(quizId: number): Promise<{ id: number }[]> {
    try {
      let query = `
      SELECT a.id
      FROM answers a
      LEFT JOIN questions qu 
      ON qu.id = a.questionId
      LEFT JOIN quizes qi
      ON qi.id = qu.quizId
      WHERE qi.id = ?
      `;
      return this.quiz.query(query, [quizId]);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteAnswer(id: number) {
    try {
      return this.answer.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteQuestion(id: number) {
    try {
      return this.question.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteQuiz(id: number) {
    try {
      return this.quiz.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
