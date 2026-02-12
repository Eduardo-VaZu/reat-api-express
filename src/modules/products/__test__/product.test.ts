import request from 'supertest'
import app from '../../../app.js'
import { describe, expect, it, vi } from 'vitest';

describe('POST /products', () => {
    it('should return 2001 when create a new product', async () => {
        const productData = {
            name: "Test Product",
            price: "100.99"
        };
        const response = await request(app)
            .post('/products')
            .send(productData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('product');

        expect(response.body.product).toHaveProperty('id');
        expect(response.body.product.name).toBe(productData.name);
        expect(response.body.product.price).toBe(productData.price);
    });

    it('should return 400 when price is missing', async () => {
        const res = await request(app)
            .post('/products')
            .send({ name: 'No Price' });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Invalid request');
    });

    it('should return 400 when price is negative', async () => {
        const res = await request(app)
            .post('/products')
            .send({ name: 'Bad Price', price: -10 });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Invalid request');
    });
});


