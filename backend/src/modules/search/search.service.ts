import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchServiceInterface } from 'src/common/interfaces';
interface PostSearchResult<T> {
  hits: {
    total: number;
    hits: Array<{
      _source: T;
    }>;
  };
}
@Injectable()
export class SearchService implements SearchServiceInterface<any> {
  constructor(private readonly elasticsearchService: ElasticsearchService) {
    this.elasticsearchService
      .ping({}, { requestTimeout: 3000 })
      .then(async () => {
        console.info('elastic search connected!');
        await this.createCourseIndex();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateIndex(updateData: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  searchIndex(searchData: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  deleteIndex(indexData: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  deleteDocument(indexData: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async createCourseIndex() {
    const indexExistence = await this.elasticsearchService.indices.exists({
      index: 'course',
    });

    if (!indexExistence) {
      await this.elasticsearchService.indices.create({
        index: 'course',
        body: {
          mappings: {
            properties: {
              categoryId: {
                type: 'integer',
              },
              instructorId: {
                type: 'integer',
              },
              name: {
                properties: {
                  tag: {
                    type: 'text',
                    fields: {
                      keyword: {
                        type: 'keyword',
                        ignore_above: 256,
                      },
                    },
                  },
                },
              },
              description: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
              image: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
              isPublished: {
                type: 'boolean',
              },
              price: {
                type: 'float',
              },
              startCourseTime: {
                type: 'date',
              },
              endCourseTime: {
                type: 'date',
              },
            },
          },
          settings: {
            analysis: {
              filter: {
                autocomplete_filter: {
                  type: 'edge_ngram',
                  min_gram: 1,
                  max_gram: 20,
                },
              },
              analyzer: {
                autocomplete: {
                  type: 'custom',
                  tokenizer: 'standard',
                  filter: ['lowercase', 'autocomplete_filter'],
                },
              },
            },
          },
        },
      });

      return indexExistence;
    }
  }
  async indexPost<T>(post: T, index: string) {
    return this.elasticsearchService.index<T>({
      index: index,
      body: {
        ...post
      }
    })
  }
  public async insertIndex(bulkData: any): Promise<any> {
    return await this.elasticsearchService
      .bulk(bulkData)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  }
}
