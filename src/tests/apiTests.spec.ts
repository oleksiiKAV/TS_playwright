import { test, expect } from '@playwright/test'
import { readUserData } from '../helpers/readUserData';
import jsonpath from 'jsonpath';

test.describe('User Sign Up API Testing', () => {
  const baseUrl = 'https://automationexercise.com/api'  

  test('API Test0: - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/non-existing-endpoint`)
    const expectedMessage = "Not Found";
    expect(response.status()).toBe(404)
    expect(response.statusText()).toBe(expectedMessage);
  })

  test(`API Test1: POST To Create/Register User Account - valid body data.`, async ({ request }) => {

    const userKey = 'user1'; // Ключ пользователя из вашего JSON файла
    const userData = await readUserData(userKey);

    const reqData = {
      name: `${userData.title} ${userData.name}`,
      email: userData.email,
      password: userData.password,
      title: userData.title,
      birth_date: userData.day,
      birth_month: userData.month,
      birth_year: userData.year,
      firstname: userData.firstName,
      lastname: userData.lastName,
      company: userData.company,
      address1: userData.address1,
      address2: userData.address2,
      country: userData.country,
      zipcode: userData.zipcode,
      state: userData.state,
      city: userData.city,
      mobile_number: userData.mobileNumber
    }
    try {
      const response = await request.post(`${baseUrl}/createAccount`, {
        form: reqData,
      });
      const responseBody = await response.json();
      // console.log(responseBody)
      expect(responseBody.responseCode).toBe(201);
      expect(responseBody.message).toBe('User created!')
    }
    catch (err) {
      console.error("Error creating account", err)
    }
    finally {
      const deleteResponse = await request.delete(`${baseUrl}/deleteAccount`, {
        form: {
          email: reqData.email,
          password: reqData.password
        },
      });
      const resDeleteResponseBody = await deleteResponse.json();
      expect.soft(resDeleteResponseBody.responseCode).toBe(200);
    }
  });


  test(`API Test2: POST To Verify Login with valid details.`, async ({ request }) => {

    const userKey = 'user1'; // Ключ пользователя из вашего JSON файла
    const userData = await readUserData(userKey);

    const reqData = {
      name: `${userData.title} ${userData.name}`,
      email: userData.email,
      password: userData.password,
      title: userData.title,
      birth_date: userData.day,
      birth_month: userData.month,
      birth_year: userData.year,
      firstname: userData.firstName,
      lastname: userData.lastName,
      company: userData.company,
      address1: userData.address1,
      address2: userData.address2,
      country: userData.country,
      zipcode: userData.zipcode,
      state: userData.state,
      city: userData.city,
      mobile_number: userData.mobileNumber
    }
    try {
      const response = await request.post(`${baseUrl}/createAccount`, {
        form: reqData,
      });
      
      const responseValidateData = await request.post(`${baseUrl}/verifyLogin`, {
        form: {
          email:reqData.email,
          password:reqData.password
        },
      });
      const responseBody = await responseValidateData.json();
      
      expect(responseBody.responseCode).toBe(200);
      expect(responseBody.message).toBe('User exists!')
    }
    catch (err) {
      console.error("Something wrong. Try again", err)
    }
    finally {
      const deleteResponse = await request.delete(`${baseUrl}/deleteAccount`, {
        form: {
          email: reqData.email,
          password: reqData.password
        },
      });
      const resDeleteResponseBody = await deleteResponse.json();
      expect.soft(resDeleteResponseBody.responseCode).toBe(200);
    }
  });


  test(`API Test3: POST To Verify Login with invalid details.`, async ({ request }) => {

    const userKey = 'user1'; // Ключ пользователя из вашего JSON файла
    const userData = await readUserData(userKey);

    const reqData = {
      name: `${userData.title} ${userData.name}`,
      email: userData.email,
      password: userData.password,
      title: userData.title,
      birth_date: userData.day,
      birth_month: userData.month,
      birth_year: userData.year,
      firstname: userData.firstName,
      lastname: userData.lastName,
      company: userData.company,
      address1: userData.address1,
      address2: userData.address2,
      country: userData.country,
      zipcode: userData.zipcode,
      state: userData.state,
      city: userData.city,
      mobile_number: userData.mobileNumber
    }
    try {
      const response = await request.post(`${baseUrl}/createAccount`, {
        form: reqData,
      });
      
      const responseValidateData = await request.post(`${baseUrl}/verifyLogin`, {
        form: {
          email:reqData.email,
          password:reqData.password+readUserData.name
        },
      });
      const responseBody = await responseValidateData.json();
      
      expect(responseBody.responseCode).toBe(404);
      expect(responseBody.message).toBe('User not found!')
    }
    catch (err) {
      console.error("Something wrong. Try again", err)
    }
    finally {
      const deleteResponse = await request.delete(`${baseUrl}/deleteAccount`, {
        form: {
          email: reqData.email,
          password: reqData.password
        },
      });
      const resDeleteResponseBody = await deleteResponse.json();
      
      expect.soft(resDeleteResponseBody.responseCode).toBe(200);
    }
  });

  test(`API Test4: POST To Search Product With Blue Term.`, async ({ request }) => {    
    try {
      const responseSearchData = await request.post(`${baseUrl}/searchProduct`, {
        form: {
          search_product:"blue"
        },
      });
      const responseBody = await responseSearchData.json();
      
      expect(responseBody.responseCode).toBe(200);

      const actualProducts = jsonpath.query(responseBody, '$..name');
      // console.log(actualProducts)
      const productsWithBlueDescription = actualProducts.every(product => {
        const description = product.toLowerCase();
        return description.includes('blue');
    });

    expect(productsWithBlueDescription).toBe(true);
    }
    catch (err) {
      console.error("Error searching products with 'Blue' term", err)
    }    
  });

  test(`API Test5: POST To Search Product With Yellow Term.`, async ({ request }) => {
    try {
        const responseSearchData = await request.post(`${baseUrl}/searchProduct`, {
            form: {
                search_product: "Yellow"
            },
        });
        const responseBody = await responseSearchData.json();      
        
        const errorResponse = jsonpath.query(responseBody, '$..error');
        expect(errorResponse).not.toBeNull();
    } catch (err) {
        console.error("Error searching products with 'Yellow' term", err);
    }    
});


})
