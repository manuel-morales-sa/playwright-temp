import { test, expect } from '@playwright/test';
import { LoginPage } from './page-object/LoginPage';

test('test-1', async ({ page }) => {
  
    await page.goto('https://mercadolibre.com/')
    await page.getByRole('link', {name: 'Colombia' }).click()
    await page.locator('//input[@name = \'as_word\']').fill('iPhone')
    await page.keyboard.press('Enter')
    await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible()
    //await page.pause()
    const titles = await page.locator('//ol[contains(@class, \'ui-search-layout\')]//li//h2').allInnerTexts()

    console.log('The total number of results is: ', titles.length)
    for(let title of titles){
        console.log('The title is: ', title)
    }
    await page.close()

})


test('test-2', async ({ page }) => {

    await page.goto('https://mercadolibre.com/')
    await page.getByRole('link', {name: 'Colombia' }).click() 
    await page.getByPlaceholder('Buscar productos, marcas y más…').fill('iPhone')
    await page.getByRole('link', {name: 'Vender', exact: true}).click()
    await page.close()
})

test('test-3', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/')

    const loginUserPage = new LoginPage ( page )

    await page.waitForTimeout(2000)
    await loginUserPage.fillUsername('standard_user')
    await page.waitForTimeout(2000)
    await loginUserPage.fillPassword('secret_sauce')
    await loginUserPage.clickOnLogin()

    /*await page.getByRole('textbox', {name: 'Username'}).fill('standard_user')
    await page.waitForTimeout(2000)
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce')
    await page.waitForTimeout(2000)
    await page.getByRole('button', {name: 'Login'}).click()
    */

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()
    const randomIndex = Math.floor(Math.random() * itemsContainer.length)
    const randomItem = itemsContainer[randomIndex]
    await page.waitForTimeout(2000)
    const expectDescription = await randomItem.locator('.inventory_item_desc').innerText()
    const expectName = await randomItem.locator('.inventory_item_name').innerText()
    const expectPrice = await randomItem.locator('.inventory_item_price').innerText()

    console.log(`Price: ${expectPrice} Name: ${expectName} Description: ${expectDescription}`)
    await page.waitForTimeout(2000)
    await randomItem.getByRole('button', {name: 'Add to cart'}).click()
    await page.waitForTimeout(2000)
    await page.locator('a.shopping_cart_link').click()

    expect (page.getByRole('button', {name: 'checkout'})).toBeVisible()

    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualDescription = await page.locator('.inventory_item_desc').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toEqual(expectName)
    expect(actualDescription).toEqual(expectDescription)
    expect(actualPrice).toEqual(expectPrice)


    await page.close()
}) 

//----------------- Login completo con dos parametros en un metodo -------------//

test('test-4', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/')
    const loginUserPage = new LoginPage (page)
    //await page.screenshot({path: 'screenshots/login_username.png'})
    await loginUserPage.loginWithCredentials('standard_user', 'secret_sauce')
    await loginUserPage.assertShoppingCarttitle()
    //await page.screenshot({path: 'screenshots/login.png', fullPage: true})
    await page.close()
    
})

//---------- Test con seleccion de ambientes --------------//

/*test('test-5', async ({ page }) => {

    
    await page.goto(process.env.URL)
    const loginUserPage = new LoginPage (page)
    await loginUserPage.loginWithCredentials('standard_user', 'secret_sauce')
    await loginUserPage.assertShoppingCarttitle()
    await page.close()
    
})*/