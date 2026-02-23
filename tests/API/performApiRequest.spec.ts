import test from 'playwright/test'
import { request } from 'playwright'
import { APIRequestContext } from '@playwright/test'

const baseURL = 'https://conduit-api.bondaracademy.com/api'
const userEmail = 'conduit001@gmail.com'
const userPassword = 'conduit001'
const loginData = {
    "user": {
        "email": userEmail,
        "password": userPassword
    }
}

test.describe('API request tests', () => {
    test('login', async ({request}) => {
        const response = await request.post(`${baseURL}/users/login`, {
            data: loginData
        })

        const responseBody = await response.json()
        const token = responseBody.user.token
        console.log(`Token: ${token}`)
    })

})


async function getToken(){
    const apiContext = await request.newContext()
}