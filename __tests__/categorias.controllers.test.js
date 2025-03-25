const request = require("supertest");
const express = require("express");
const { getAllCat, add, update } = require("../src/controllers/categorias.controllers.js");
const { Category } = require("../src/models/Categorias.model.js");

const app = express();
app.use(express.json());
app.get('/category', getAllCat);
app.post('/category', add);
app.patch('/category/:id', update);

const initialCategories = [
    {description: 'Category 1'},
    {description: 'Category 2'},
    {description: 'Category 3'}
]

beforeEach(async() => {
    const categories = await Category.findAll();
    if(categories.length > 0) return;
    await Category.bulkCreate(initialCategories);
});

describe('Categorias Controllers', () => {
    describe('getAllCat', () => {
        it('should return all categories', async () => {
            const response = await request(app).get('/category');

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should handle errors', async () => {
            jest.spyOn(Category, 'findAll').mockRejectedValue(new Error('Database error'));
            const response = await request(app).get('/category');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'error al obtener las categorias' });
        });
    });

    describe('add', () => {
        it('should add a new category', async () => {
            const newCategory = { description: 'New Category'};
            const createdCategory = { id: 1, ...newCategory };
            Category.create.mockResolvedValue(createdCategory);

            const response = await request(app).post('/category').send(newCategory);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(createdCategory);
        });

        it('should handle errors', async () => {
            jest.spyOn(Category, 'create').mockRejectedValue(new Error('Database error'));

            const response = await request(app).post('/category').send({ description: 'New Category', imgUrl: 'newUrl' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error al agregar categorias.' });
        });
    });

    // describe('update', () => {
    //     it('should update a category', async () => {
    //         const updatedCategory = { description: 'Updated Category', imgUrl: 'updatedUrl' };
    //         Category.update.mockResolvedValue([1]);

    //         const response = await request(app).put('/categories/1').send(updatedCategory);

    //         expect(response.status).toBe(201);
    //         expect(response.body).toEqual([1]);
    //     });

    //     it('should handle errors', async () => {
    //         Category.update.mockRejectedValue(new Error('Database error'));

    //         const response = await request(app).put('/categories/1').send({ description: 'Updated Category', imgUrl: 'updatedUrl' });

    //         expect(response.status).toBe(500);
    //         expect(response.body).toEqual({ message: 'Error al actualizar categoria', error: 'Database error' });
    //     });
    // });
});