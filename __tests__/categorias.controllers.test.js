const request = require("supertest");
const express = require("express");
const { getAllCat, add, update } = require("../src/controllers/categorias.controllers.js");
const Category = require('../src/models/categorias.model.js');


jest.mock('../src/models/categorias.model.js');

const app = express();
app.use(express.json());
app.get('/categories', getAllCat);
app.post('/categories', add);
app.put('/categories/:id', update);

describe('Categorias Controllers', () => {
    describe('getAllCat', () => {
        it('should return all categories', async () => {
            const mockCategories = [{ id: 1, description: 'Category 1', imgUrl: 'url1' }];
            Category.findAll.mockResolvedValue(mockCategories);

            const response = await request(app).get('/categories');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCategories);
        });

        it('should handle errors', async () => {
            Category.findAll.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/categories');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'error al obtener las categorias' });
        });
    });

    describe('add', () => {
        it('should add a new category', async () => {
            const newCategory = { description: 'New Category', imgUrl: 'newUrl' };
            const createdCategory = { id: 1, ...newCategory };
            Category.create.mockResolvedValue(createdCategory);

            const response = await request(app).post('/categories').send(newCategory);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(createdCategory);
        });

        it('should handle errors', async () => {
            Category.create.mockRejectedValue(new Error('Database error'));

            const response = await request(app).post('/categories').send({ description: 'New Category', imgUrl: 'newUrl' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error al agregar categorias.' });
        });
    });

    describe('update', () => {
        it('should update a category', async () => {
            const updatedCategory = { description: 'Updated Category', imgUrl: 'updatedUrl' };
            Category.update.mockResolvedValue([1]);

            const response = await request(app).put('/categories/1').send(updatedCategory);

            expect(response.status).toBe(201);
            expect(response.body).toEqual([1]);
        });

        it('should handle errors', async () => {
            Category.update.mockRejectedValue(new Error('Database error'));

            const response = await request(app).put('/categories/1').send({ description: 'Updated Category', imgUrl: 'updatedUrl' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error al actualizar categoria', error: 'Database error' });
        });
    });
});