import { test, expect } from '@playwright/test';

test('registration', async ({ page}, testInfo) => {
  await page.goto('http://127.0.0.1:5500/registration/register.html');

  const name= 'Julio';  
  const lastName= 'Gonzalez';
  const age= '30';
  const country= 'Colombia';
  const Email= 'Mjulio.gonzalez@example.com';
  const sex='M';

  await page.locator('input#name').fill(name);
  await page.locator("input#last-name").fill(lastName);
  await page.locator("input#age").fill(age);
  await page.locator("select#country").selectOption(country);
  await page.locator(`input[value='${sex}']`).click();
  await page.locator("input#email").fill(Email);
  await page.locator("input#monday").click();
  await page.locator("input#picture").setInputFiles('imagen/img1.jpg');

  //sirve para tomar una captura de pantalla de la página actual y mostrarlo en el reporte llamado registration.png 
  await testInfo.attach('screenshot', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  await page.screenshot({path: 'screenshot/registration.png', fullPage: true});


  const [SumaryPage] =await Promise.all([
    //waitForEvent() sirve para esperar a que se abra una nueva ventana, en este caso se espera a que se abra la ventana de resumen de la transacción
    page.waitForEvent('popup'),
    await page.locator("button#save-btn").click()
  ]);
  //waitForLoadState() sirve para esperar a que la nueva ventana se cargue completamente antes de continuar con el test
  await SumaryPage.waitForLoadState();
  await expect(SumaryPage).toHaveTitle("Summary")
  //sirve para obtener el contenido de texto de cada uno de los elementos que se van a validar, en este caso se esta obteniendo el contenido de texto del nombre, apellido y edad ingresados en el formulario
  const currentName = await SumaryPage.locator("//strong[contains(.,'Nombre')]/ancestor::P").textContent();
  const currentLastName = await SumaryPage.locator("//strong[contains(.,'Apellido')]/ancestor::P").textContent();
  const currentAge = await SumaryPage.locator("//strong[contains(.,'Edad')]/ancestor::P").textContent();

  //sirve para validar que el contenido de texto de cada uno de los elementos sea igual al valor esperado, en este caso se esta validando que el nombre, apellido y edad sean iguales a los valores ingresados en el formulario
  expect (currentName).toContain(name);
  expect (currentLastName).toContain(lastName);
  expect (currentAge).toContain(age);

  //poner sumaryPage por que es la segunda ventana que se abre, la primera es la de registro y la segunda es la de resumen
  //await SumaryPage.screenshot({path: 'screenshot/summary.png', fullPage: true});

  //sirve para tomar una captura de pantalla de la página actual y mostrarlo en el reporte llamado summary.png
   await testInfo.attach('screenshot', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });


});
