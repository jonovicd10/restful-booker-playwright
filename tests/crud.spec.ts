import { test, expect, APIRequestContext } from '@playwright/test';
import * as testData from './data/test-data.ts'
import * as config from './config/config'

let authToken: string;
let apiContext: APIRequestContext;
let bookingId: number

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext();
  
    const response = await apiContext.post(`${config.API_URL}${config.AUTH_ENDPOINT}`, {
        data: {
        username: testData.authCredentials.username,
        password: testData.authCredentials.password
        },
    });

    const responseBody = await response.json();
    authToken = responseBody.token;
    expect(authToken).toBeDefined();
});

test.describe('CRUD Tests', () => {
    test('should create a new booking', async () => {
        const response = await apiContext.post(`${config.API_URL}${config.BOOKING_ENDPOINT}`, {
          headers: {
                Cookie: `token=${authToken}`, 
          },
          data: testData.bookingData
        });
    
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
    
        expect(responseBody).toHaveProperty('bookingid');
        expect(typeof responseBody.bookingid).toBe('number');
        expect(responseBody.booking).toMatchObject(testData.bookingData);

        bookingId = responseBody.bookingid;
    });

    test('should return a booking based on bookingid', async () => {
        const response = await apiContext.get(`${config.API_URL}${config.BOOKING_ENDPOINT}/${bookingId}`, {
            headers: {
                Cookie: `token=${authToken}`,
            },
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject(testData.bookingData);
    });

    test('should update a booking', async () => {
        const response = await apiContext.put(`${config.API_URL}${config.BOOKING_ENDPOINT}/${bookingId}`, {
        headers: {
            Cookie: `token=${authToken}`,
        },
            data: testData.updatedBookingData
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject(testData.updatedBookingData);
    });

    test('should delete a booking', async () => {
        const deleteRequest = await apiContext.delete(`${config.API_URL}${config.BOOKING_ENDPOINT}/${bookingId}`, {
          headers: {
            Cookie: `token=${authToken}`,  
          },
        });
        expect(deleteRequest.status()).toBe(201);
      
        const getResponse = await apiContext.get(`${config.API_URL}${config.BOOKING_ENDPOINT}/${bookingId}`, {
          headers: {
            Cookie: `token=${authToken}`,
          },
        });
        expect(getResponse.status()).toBe(404); 
    });

    test.afterAll(async () => {
        await apiContext.dispose();  
    });
});
