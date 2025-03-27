import request from "supertest";
import express from "express"
import { getAllCat, add, update } from "../src/controllers/categorias.controllers.js";
import { Category } from"../src/models/Categorias.model.js";
import { afterAll, expect, jest } from '@jest/globals';


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

let existingCategories;

beforeEach(async () => {
    try {
        console.log("Eliminando categorías...");
        existingCategories = await Category.findAll();
        await Category.destroy({ where: {}, truncate: true, force: true });
        console.log("Categorías eliminadas. Insertando nuevas categorías...");
        await Category.bulkCreate(initialCategories);
        console.log("Categorías insertadas correctamente.");
    } catch (error) {
        console.error("Error en beforeEach:", error);
    }
});

describe('Categorias Controllers', () => {
    describe('getAllCat', () => {
        it('should return all categories', async () => {
            const response = await request(app).get('/category');
            console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body.length).toEqual(initialCategories.length);
        });

        it('should handle errors', async () => {
            Category.findAll = jest.fn().mockRejectedValue(new Error("Database error")); // Simulamos un error en la base de datos
            const response = await request(app).get('/category');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'error al obtener las categorias' });
        });
    });

    describe('add', () => {
        it('should add a new category', async () => {
            const newCategory = { description: 'New Category', imgUrl: "image.jpg"};
            const createdCategory = { id: initialCategories.length + 1, description: 'New Category', imgUrl: "image.jpg" };
            const response = await request(app).post('/category').send(newCategory);
            const {description, imgUrl,id} = response.body;
            expect(description).toEqual(createdCategory.description);
            expect(id).toEqual(createdCategory.id);
            expect(imgUrl).toEqual(createdCategory.imgUrl);
            expect(response.status).toBe(201);
        });

        it('should handle errors', async () => {
            Category.create =jest.fn().mockRejectedValue(new Error('Database error'));
            const response = await request(app).post('/category').send({ description: 'New Category', imgUrl: 'newUrl' });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error al agregar categorias.' });
        });
    });

    describe('update', () => {
        it('should update a category', async () => {
            const updatedCategory = { description: 'Updated Category', imgUrl: 'updatedUrl' };
            const response = await request(app).patch('/category/1').send(updatedCategory);
            expect(response.status).toBe(201);
            expect(response.body).toEqual([1]);
        });

        it('should handle errors', async () => {
            Category.update = jest.fn().mockRejectedValue(new Error('Database error'));
            const response = await request(app).patch('/category/1').send({ description: 'Updated Category', imgUrl: 'updatedUrl' });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: "Error al actualizar categoria" });
        });
    });
});