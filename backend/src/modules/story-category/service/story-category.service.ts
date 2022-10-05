import { Injectable } from '@nestjs/common';
import { QueryListDTO } from 'src/common/dto/api.request.dto';
import { getManager } from 'typeorm';
import { StoryCategoryListResponse } from '../dto/api-response.dto';
import { queryListClause } from 'src/common/helpers/query';

@Injectable()
export class StoryCategoryService {
  constructor() {
    //
  }

  async findStoryByCategoryIds(
    categoryIds: number[],
    { limit, page, orderBy }: QueryListDTO,
    isHot: boolean,
    isUniqueCategory: boolean,
  ): Promise<StoryCategoryListResponse> {
    const entityManager = getManager();

    const categoryIdsClause = (id) => `sc.categoryId = ${id}`;
    let groupQuery = '';

    const whereClauseList = (): string => {
      let query = '';

      if (categoryIds.length > 0) {
        query = `where `;
        let categoryIdsRaw = `( ${categoryIdsClause(categoryIds[0])}`;
        for (let i = 1; i < categoryIds.length; i++) {
          categoryIdsRaw = `${categoryIdsRaw} or ${categoryIdsClause(
            categoryIds[i],
          )}`;
        }
        categoryIdsRaw += ') ';

        const hotClause = isHot ? `and s.isHot = ${isHot}` : '';

        query += `${categoryIdsRaw} ${hotClause}`;
      } else {
        const hotClause = isHot ? `where s.isHot = ${isHot}` : '';
        query += `${hotClause}`;
        groupQuery = `${isUniqueCategory}` === 'true' ? `GROUP BY c.id` : '';
      }

      return query;
    };

    const body = `FROM story_categories sc join stories s on s.id = sc.storyId join categories c on c.id = sc.categoryId ${whereClauseList()}`;
    const rawQuery = `SELECT sc.id, sc.storyId, sc.categoryId, s.name, s.isHot, s.content, c.image ${body} ${groupQuery} ${queryListClause(
      'sc.id',
      page,
      limit,
      orderBy,
    )}`;

    const totalQuery = `SELECT count(sc.id) as total ${body}`;

    const resultItems = await entityManager.query(rawQuery);
    const [resultTotal] = await entityManager.query(totalQuery);

    return {
      items: resultItems,
      totalItems: parseInt(resultTotal.total),
    };
  }
}
