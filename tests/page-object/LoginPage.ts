import { Locator, Page, expect } from "@playwright/test"

export class LoginPage {

   private readonly usernameTextbox: Locator
   private readonly passwordTextbox: Locator
   private readonly loginButton: Locator
   private readonly shooppingCartTitle: Locator

   constructor(page: Page) {
      this.usernameTextbox = page.getByRole('textbox', { name: 'Username' })
      this.passwordTextbox = page.getByRole('textbox', { name: 'Password' })
      this.loginButton = page.getByRole('button', { name: 'Login' })
      this.shooppingCartTitle = page.locator('.app_logo')

   }

   async fillUsername(username: string) {
      await this.usernameTextbox.fill(username)
   }

   async fillPassword(password: string) {
      await this.passwordTextbox.fill(password)
   }

   async clickOnLogin() {
      await this.loginButton.click()
   }

   async loginWithCredentials(username:string, password:string){
      await this.fillUsername(username)
      await this.fillPassword(password)
      await this.clickOnLogin()
   }

   async assertShoppingCarttitle(){
      await expect(this.shooppingCartTitle).toHaveText('Swag Labs')
   }
}