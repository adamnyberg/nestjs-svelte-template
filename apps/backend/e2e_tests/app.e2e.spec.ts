import * as request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Todo } from 'prisma/generated/models';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ statusCode: 'OK' })
      .expect('Content-Type', /json/);
  });

  describe('/todos', () => {
    const createTodo = { text: 'Test todo', completed: false };
    let createdTodo: Todo;

    it('GET', async () => {
      await request(app.getHttpServer())
        .get('/todos')
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('GET one 404', async () => {
      await request(app.getHttpServer())
        .get('/todos/non-existing-id')
        .expect(404);
    });

    it('POST', async () => {
      createdTodo = (
        await request(app.getHttpServer())
          .post('/todos')
          .send(createTodo)
          .expect(201)
          .expect('Content-Type', /json/)
      ).body;
      expect(createdTodo.text).toEqual(createTodo.text);
      expect(createdTodo.completed).toEqual(createTodo.completed);
    });

    it('GET created todo', async () => {
      const getCreatedTodo = await request(app.getHttpServer())
        .get(`/todos/${createdTodo.id}`)
        .expect(200)
        .expect('Content-Type', /json/);
      expect(getCreatedTodo.body.text).toEqual(createTodo.text);
      expect(getCreatedTodo.body.completed).toEqual(createTodo.completed);
    });

    it('PUT update text', async () => {
      const updateTextTodo = { text: 'Updated text' };
      createdTodo.text = updateTextTodo.text;
      const updatedTextTodo = await request(app.getHttpServer())
        .put(`/todos/${createdTodo.id}`)
        .send(updateTextTodo)
        .expect(200)
        .expect('Content-Type', /json/);
      expect(updatedTextTodo.body.text).toEqual(updateTextTodo.text);
      expect(updatedTextTodo.body.completed).toEqual(createTodo.completed);
    });

    it('PUT update completed', async () => {
      const updateCompletedTodo = { completed: true };
      const updatedCompletedTodo = await request(app.getHttpServer())
        .put(`/todos/${createdTodo.id}`)
        .send(updateCompletedTodo)
        .expect(200)
        .expect('Content-Type', /json/);
      expect(updatedCompletedTodo.body.text).toEqual(createdTodo.text);
      expect(updatedCompletedTodo.body.completed).toEqual(
        updateCompletedTodo.completed,
      );
    });

    it('PUT update text and completed', async () => {
      const updateTodo = {
        text: 'Updated text and completed',
        completed: false,
      };
      const updatedTodo = await request(app.getHttpServer())
        .put(`/todos/${createdTodo.id}`)
        .send(updateTodo)
        .expect(200)
        .expect('Content-Type', /json/);
      expect(updatedTodo.body.text).toEqual(updateTodo.text);
      expect(updatedTodo.body.completed).toEqual(updateTodo.completed);
    });

    it('DELETE', async () => {
      await request(app.getHttpServer())
        .delete(`/todos/${createdTodo.id}`)
        .expect(204);
    });
  });
});
