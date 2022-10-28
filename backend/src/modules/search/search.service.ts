import { BadRequestException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchServiceInterface } from 'src/common/interfaces';

@Injectable()
export class SearchService implements SearchServiceInterface<any> {
  constructor(private readonly elasticsearchService: ElasticsearchService) {
    this.elasticsearchService
      .ping({}, { requestTimeout: 3000 })
      .then(() => {
        console.info('elastic search connected!');
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
  async CreateDoctorIndex() {
    const indexExistence = await this.elasticsearchService.indices.exists({
      index: 'doctors',
    });

    if (indexExistence) {
      throw new BadRequestException();
    } else {
      await this.elasticsearchService.indices.create({
        index: 'post',
        body: {
          mappings: {
            properties: {
              email: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
              tags: {
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
              text: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
              title: {
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
  public async insertIndex(bulkData: any): Promise<any> {
    return await this.elasticsearchService
      .bulk(bulkData)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  }
}
