import { test, expect } from '@playwright/test';
import { LoginPage } from './page-object/LoginPage';

test('quitar imagenes', async ({ page }) => {


    await page.route(
        "**/*.{png,jpg,jpeg,svg}",
        (route) => route.abort()
    );

    await page.route(
        "https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b0.jpg",
        (route) => route.abort()
    );

    await page.on("request", req => {
        console.log(req.url())
    })
    await page.goto('https://www.saucedemo.com/')
    const loginUserPage = new LoginPage(page)
    await loginUserPage.loginWithCredentials('standard_user', 'secret_sauce')
    await loginUserPage.assertShoppingCarttitle()

    await page.screenshot({
        path: 'login.png', fullPage: true
    })

    //await page.close()

})

test('solo un libro', async ({ page }) => {


    await page.route(
        "https://demoqa.com/BookStore/v1/Books",
        (route) => {
            route.fulfill({
                status: 304,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `

            {
                "books": [
                    {
                        "isbn": "9781449325862",
                        "title": "El libro que Manuel nunca escribio",
                        "subTitle": "A Working Introduction",
                        "author": "Richard E. Silverman",
                        "publish_date": "2020-06-04T08:48:39.000Z",
                        "publisher": "O'Reilly Media",
                        "pages": 500,
                        "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                        "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                    }
                ]
            }
            `
        })
      }
    );
  
    
     await page.goto('https://demoqa.com/books') 

     //await page.pause()
     await page.screenshot({path:'books.png', fullPage:true}) 
  });