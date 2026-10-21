import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageobjets/login/LoginPage';
import { AddTransactionPage } from '../../pageobjets/add-transactions/AddTransactionPage';
import { faker } from '@faker-js/faker';
import { NavigateTo } from '../../pageobjets/navigateTo/navigateTo';

test('login', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login/login.html');

  /*await page.locator('input#username').fill('user');
  await page.locator('input#password').fill('pass');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();*/

//ejemplo de como llamar a la clase LoginPage y sus metodos
  /*const loginPage = new LoginPage(page);
  await loginPage.fillUsername();
  await loginPage.fillPassword();
  await loginPage.clickLoginButton();*/



//otro ejemplo de como llamar a la clase LoginPage y sus metodos en una sola linea
  const loginPage = new LoginPage(page);
  await loginPage.doLogin('user', 'pass');

  await page.getByRole('button', { name: 'Añadir transacción' }).click();
  await page.locator('id=date').fill('2023-06-01');
  await page.locator('id=amount').fill('500');
  await page.locator('id=description').fill('Pago de servicios');
  await page.getByRole('button', { name: 'Guardar' }).click();
//se debe de crear una valiable para cada uno de los elementos que se van a validar
//el textContent es para obtener el contenido de texto de un elemento, en este caso se esta obteniendo el contenido de la primera fila de la tabla de transacciones
 const actualDate = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent()
const actualAmount = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent()
const actualDescription = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent()
//se valida que el contenido de texto de cada uno de los elementos sea igual al valor esperado
expect(actualDate).toEqual('2023-06-01');
expect(actualAmount).toEqual('500');
expect(actualDescription).toEqual('Pago de servicios');


});

test('login failed', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login/login.html');

  /*await page.locator('input#username').fill('user');
  await page.locator('input#password').fill('pass');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();*/
  /*const loginPage = new LoginPage(page);
  await loginPage.fillUsername();
  await loginPage.fillPassword();
  await loginPage.clickLoginButton();*/

  const loginPage = new LoginPage(page);
  await loginPage.doLogin('user', 'pass');


  await page.getByRole('button', { name: 'Añadir transacción' }).click();
  await page.locator('id=date').fill('2023-06-01');
  await page.locator('id=amount').fill('500');
  await page.locator('id=description').fill('Pago de servicios');
  await page.getByRole('button', { name: 'Guardar' }).click();
//se debe de crear una valiable para cada uno de los elementos que se van a validar
//el textContent es para obtener el contenido de texto de un elemento, en este caso se esta obteniendo el contenido de la primera fila de la tabla de transacciones
 const actualDate = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent()
const actualAmount = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent()
const actualDescription = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent()
//se valida que el contenido de texto de cada uno de los elementos sea igual al valor esperado
expect(actualDate).toEqual('2023-06-01');
expect(actualAmount).toEqual('500');
expect(actualDescription).toEqual('Pago de servicios');


});

test('Login Refactor', async ({ page }) => {
  
 // await page.goto('http://127.0.0.1:5500/login/login.html');
//este es un ejemplo de como llamar a la clase NavigateTo y sus metodos loginPage, para navegar a la pagina de login
  const navigateTo = new NavigateTo(page);
  await navigateTo.loginPage();

//
  const transacionDate = '2023-06-01';
  const transactionAmount = faker.number.int({ min: 500, max: 5000 }).toString();
  const transactionDescription = faker.food.description();

//ejemplo de como llamar a la clase LoginPage y sus metodos doLogin, para hacer login en la aplicacion
   const loginPage = new LoginPage(page);
  await loginPage.doLogin('user', 'pass');
//ejemplo de como llamar a la clase AddTransactionPage y sus metodos addtransaction, para agregar una transaccion
  const addTransactionPage = new AddTransactionPage(page);
  await addTransactionPage.addtransaction(transacionDate, transactionAmount, transactionDescription);

  /*await page.getByRole('button', { name: 'Añadir transacción' }).click();
  await page.locator('id=date').fill('2023-06-01');
  await page.locator('id=amount').fill('500');
  await page.locator('id=description').fill('Pago de servicios');
  await page.getByRole('button', { name: 'Guardar' }).click();*/
//se debe de crear una valiable para cada uno de los elementos que se van a validar

//el textContent es para obtener el contenido de texto de un elemento, en este caso se esta obteniendo el contenido de la primera fila de la tabla de transacciones
 /*const actualDate = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent()
const actualAmount = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent()
const actualDescription = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent()*/

//se valida que el contenido de texto de cada uno de los elementos sea igual al valor esperado
/*expect(actualDate).toEqual(transacionDate);
expect(actualAmount).toEqual(transactionAmount);
expect(actualDescription).toEqual(transactionDescription);*/

expect(await addTransactionPage.getActualDate('1')).toEqual(transacionDate);
expect(await addTransactionPage.getActualAmount('1')).toEqual(transactionAmount);
expect(await addTransactionPage.getActualDescription('1')).toEqual(transactionDescription);




});

