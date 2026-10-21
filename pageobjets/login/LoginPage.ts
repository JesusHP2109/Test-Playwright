import { Locator,Page } from "@playwright/test";
export class LoginPage {
    private readonly usernameTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly loginButton: Locator;

    constructor(private readonly page: Page) {
        this.usernameTextBox = page.locator('input#username');
        this.passwordTextBox = page.locator('input#password');
        this.loginButton = page.getByRole('button', { name: 'Iniciar Sesión' });
    }

     private async fillUsername(){
        await this.usernameTextBox.fill('user');
    }

    private async fillPassword(){
        await this.passwordTextBox.fill('pass');
    }

    private async clickLoginButton(){
         await this.loginButton.click();
    }

    async doLogin(username: string, password: string){
        await this.usernameTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
    }
}