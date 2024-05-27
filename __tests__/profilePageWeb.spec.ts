import assert from 'assert';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';

import 'selenium-webdriver/chrome';
import 'chromedriver';

import { getElementById } from '../utils';

const rootURL = 'http://localhost:8081';

let driver: WebDriver;

// setup
beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
}, 30000); // Increase timeout for setup if necessary

// teardown
afterAll(async () => {
  await driver.quit();

  // if there is a way to revert the database, do it here
});

describe('ProfilePageWeb', () => {
  beforeAll(async () => {
    await driver.get(`${rootURL}/`);

    // Login first
    await driver.wait(until.elementLocated(By.id('username')), 30000);

    const username = await getElementById('username', driver);
    await username.sendKeys('Lesbolds_3');

    const password = await getElementById('password', driver);
    await driver.wait(until.elementIsVisible(password), 10000);
    await password.sendKeys('Lesbolds@123');

    const submitButton = await getElementById('submit', driver);
    await driver.wait(until.elementIsVisible(submitButton), 10000);
    await submitButton.click();

    // Wait for the URL to change to the home page
    await driver.wait(until.urlIs(`${rootURL}/home`), 30000);
  }, 30000);

  it('should display user information and plant information', async () => {
    await driver.get(`${rootURL}/profile`);

    const usernameElement = await getElementById('username', driver);
    const username = await usernameElement.getText();
    assert.strictEqual(username, 'Username: Lesbolds_3');

    const emailElement = await getElementById('email', driver);
    const email = await emailElement.getText();
    assert.strictEqual(email, 'Email: lesbolds3@sample.com');

    const plantLevelElement = await getElementById('plant-level', driver);
    const plantLevel = await plantLevelElement.getText();
    assert.strictEqual(plantLevel, 'Level: 1');

    const plantExpElement = await getElementById('plant-current-exp', driver);
    const plantExp = await plantExpElement.getText();
    assert.strictEqual(plantExp, 'Exp Level: 0');
  });

  it('should allow user to edit profile', async () => {
    await driver.get(`${rootURL}/profile`);

    const editButton = await getElementById('edit-user-info', driver);
    await driver.wait(until.elementIsVisible(editButton), 10000);
    await editButton.click();

    const usernameInput = await driver.findElement(By.css('input[placeholder="Enter username"]'));
    await driver.wait(until.elementIsVisible(usernameInput), 10000);
    await usernameInput.clear();
    await usernameInput.sendKeys('NewUsername');

    const emailInput = await driver.findElement(By.css('input[placeholder="Enter email"]'));
    await emailInput.clear();
    await emailInput.sendKeys('newemail@example.com');

    const saveButton = await driver.findElement(By.xpath('//button[text()="Save"]'));
    await driver.wait(until.elementIsVisible(saveButton), 10000);
    await saveButton.click();

    // Verify the changes
    const usernameElement = await getElementById('username', driver);
    const username = await usernameElement.getText();
    assert.strictEqual(username, 'Username: NewUsername');

    const emailElement = await getElementById('email', driver);
    const email = await emailElement.getText();
    assert.strictEqual(email, 'Email: newemail@example.com');
  });

  it('should allow user to logout', async () => {
    await driver.get(`${rootURL}/profile`);

    const logoutButton = await driver.findElement(By.xpath('//button[text()="Logout"]'));
    await driver.wait(until.elementIsVisible(logoutButton), 10000);
    await logoutButton.click();

    // Verify that the user is redirected to the login page
    await driver.wait(until.urlIs(`${rootURL}/`), 30000);
  });
});