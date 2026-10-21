import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('shopping cart', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/shopping%20cart/');

  for (let i = 0; i <= 5; i++) {
    //si hay mas de un elemento con el mismo nombre, se puede usar nth para seleccionar el elemento que se quiere, en este caso se esta seleccionando el primer elemento con el nombre 'Añadir al carrito'

    await page.locator("//h5[contains(., 'Producto 1')]/ancestor::div[contains(@class, 'card-body')]//button").click();
  }

  
//.addto-cart es la clase que tienen los botones de añadir al carrito, se puede usar para seleccionar el elemento que se quiere, en este caso se esta seleccionando el segundo elemento con la clase 'add-to-cart'
await page.locator("//h5[contains(., 'Producto 2')]/ancestor::div[contains(@class, 'card-body')]//button").click();
await page.locator("//h5[contains(., 'Producto 3')]/ancestor::div[contains(@class, 'card-body')]//button").click();

await page.locator("button#view-cart-btn").click();
  
const product1quantity = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 1')]/ancestor::tr//td[3]").textContent();
const product2quantity = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 2')]/ancestor::tr//td[3]").textContent();
const product3quantity = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 3')]/ancestor::tr//td[3]").textContent();

expect(product1quantity).toEqual('6');
expect(product2quantity).toEqual('1');
expect(product3quantity).toEqual('1');

//click para ir a la pagina de checkout
await page.locator("id=checkout-btn").click();
//completamos los campos del formulario de checkout con datos aleatorios generados por faker
await page.locator("id=name").fill(faker.person.fullName());
await page.locator("id=email").fill(faker.internet.email());
await page.locator("id=address").fill(faker.location.streetAddress());

await page.waitForTimeout(2000);
await page.getByRole('link', { name: 'Información de pago' }).click();

await page.locator("id=card-number").fill(faker.finance.creditCardNumber());
await page.locator("id=card-expiry").fill('12-2027');
await page.locator("id=card-cvc").fill(faker.finance.creditCardCVV());

await page.locator("id=place-order-btn").click();

//validamos que el mensaje de compra exitosa se muestre en la pantalla
await expect(page.locator("//h4[contains(., '¡Tu compra fue exitosa!')]")).toBeVisible();
});

