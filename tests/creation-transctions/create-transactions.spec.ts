import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';

test('create transaction', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login/login.html');

await page.locator('input#username').fill('user');
  await page.locator('input#password').fill('pass');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
 
//el for sirve para crear 30 transacciones, se puede cambiar el valor de i para crear mas o menos transacciones
  for(let i = 0; i <=1; i++) { 

    await page.getByText('Añadir transacción').click(); 
      await page.locator('id=date').fill('2023-06-01');
      //await page.locator('id=amount').fill('500');
      //faker sirve para generar datos aleatorios, en este caso se esta generando un numero aleatorio entre 1 y 1000 para el monto de la transacción y un nombre aleatorio para la descripción de la transacción
      await page.locator('id=amount').fill(faker.number.int({ min: 1, max: 1000 }).toString());
      await page.locator('id=description').fill(faker.person.firstName());
      await page.getByRole('button', { name: 'Guardar' }).click();
  }

  await page.pause();
});


