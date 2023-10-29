# TS_playwright


s# AutomationExercise - Playwright UI & API Automation

**General Instructions:**

1. Use this website https://www.automationexercise.com
2. Use the "Playwright" Test automation framework for both UI and API automation
3. Use Typescript, Test Steps and Test Parameters

**Task 1** : Write test scripts covering below framework principles;
Input Data reading from external file (your choice of file format).
Page Object Model
Reporting in html reporter Reporters | Playwright
Execution command line options to run on variety of supported browsers

**UI Test1 - Register user**

```
Open website Automation Exercise
Go to Signup page
Signup here Automation Exercise - Signup / Login
Assert whether signup is successful
```
**UI Test2 - Login user**

```
Login - Invalid scenario
Enter an invalid password and assert login is not successful
Login - Valid scenario
Enter a valid password and assert login is successful
```
**UI Test3 - Add to Cart (Data-Driven Tests from External file)**

```
Prepare an External file for Data-Driven Tests for all products that contain ‘Blue’
Add all products from the External file to the Cart
Assert whether each added product in the Cart contains the text ‘Blue’
Assert whether no added product in the Cart contains the text ‘Yellow’
```


**Task 2:** Create Automated Tests for Get and Post call validations covering below;

```
Response code validation
Response message validation
Validate few particular values from response Json using Json path
Test execution should produce a report having Pass & fail statuses
```
**API Test1: POST To Create/Register User Account**

```
API URL: https://automationexercise.com/api/createAccount
Request Method: POST
Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname,
lastname, company, address1, address2, country, zipcode, state, city, mobile_number
Response Code: 201
Response Message: User created!
```
**API Test2: POST To Verify Login with valid details**

```
API URL: https://automationexercise.com/api/verifyLogin
```

```
Request Method: POST
Request Parameters: email, password
Response Code: 200
Response Message: User exists!
```
**API Test3: POST To Verify Login with invalid details**

```
API URL: https://automationexercise.com/api/verifyLogin
Request Method: POST
Request Parameters: email, password (invalid values)
Response Code: 404
Response Message: User not found!
```
**API Test4: POST To Search Product**

```
API URL: https://automationexercise.com/api/searchProduct
Request Method: POST
Request Parameter: search_product (For example: blue, yellow)
Response Code: 200
Response JSON: Searched products list
Assert whether Blue search term returns the expected products in response Json using Json path
Assert whether Yellow search term returns error response in response Json using Json path
```

