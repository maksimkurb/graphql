import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ApplicationModule } from '../type-graphql/app.module';

describe('TypeGraphQL', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`should return query result`, () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: '{\n  recipes {\n    id\n  }\n}\n',
      })
      .expect(200, {
        data: {
          recipes: [],
        },
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
