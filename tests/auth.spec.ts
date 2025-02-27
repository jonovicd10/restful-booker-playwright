import { test, expect, APIRequestContext } from '@playwright/test';
import * as testData from './data/test-data';
import * as config from './config/config'

test.describe('Authentication Tests', () => {
    let apiContext: APIRequestContext;

    test.beforeAll(async ({ playwright }) => {
        apiContext = await playwright.request.newContext(); 
    });

    test('should successfully authenticate with valid credentials', async () => {
        const response = await apiContext.post(`${config.API_URL}${config.AUTH_ENDPOINT}`, {
        data: {
            username: testData.authCredentials.username,
            password: testData.authCredentials.password
        }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.token).toBeDefined();
    });

    test('should fail to authenticate with invalid credentials', async () => {
        const response = await apiContext.post(`${config.API_URL}${config.AUTH_ENDPOINT}`, {
        data: {
            username: 'wronguser',
            password: 'wrongpassword'
        }
        });

        expect(response.status()).toBe(200);  
        const responseBody = await response.json();
        expect(responseBody.reason).toBe('Bad credentials');
    });

    test.afterAll(async () => {
        await apiContext.dispose(); 
    });
});
