import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import 'selenium-webdriver/chrome';
import 'chromedriver';

import { getElementById } from '../utils';

const rootURL = 'http://localhost:8081'; // Adjust this to the correct URL where your app is running

let driver: WebDriver;

describe('Signup Page', () => {
  // Setup WebDriver before running tests
  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  }, 30000);

  // Quit WebDriver after tests are done
  afterAll(async () => {
    await driver.quit();
  });

  it('should allow user to sign up', async () => {
    await driver.get(`${rootURL}/signup`); // Adjust the path to where the Signup component is rendered

    // Wait for the username input to be present and interactable
    const username = await getElementById('username', driver);
    await username.sendKeys('testuser');

    // Wait for the email input to be present and interactable
    const email = await getElementById('email', driver);
    await email.sendKeys('testuser@example.com');

    // Wait for the password input to be present and interactable
    const password = await getElementById('password', driver);
    await password.sendKeys('password');

    // Wait for the sign-up button to be present and interactable
    const signUpButton = await getElementById('signup', driver);
    await signUpButton.click();

    // Wait for the URL to change to the home page or a successful signup indication
    await driver.wait(until.urlIs(`${rootURL}/`), 30000);
  }, 60000); // Increase timeout for this test if necessary
});