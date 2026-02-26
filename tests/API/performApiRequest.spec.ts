import test from 'playwright/test'
import { request } from 'playwright'
import { APIRequestContext } from '@playwright/test'
import { assert } from 'node:console'
import { ApiData } from './apiData'
import {loginAndGetToken, publishArticle} from './helperFunctions'
const apiData = new ApiData()

test.describe('API request tests', () => {
    test('login', async ({request}) => {
        const response = await request.post(`${apiData.baseURL}/users/login`, {
            data: apiData.loginData
        })

        const responseBody = await response.json()
        const token = responseBody.user.token
        console.log(`Token: ${token}`)
    })

    test('login & Publish article', async ({request}) => {
        // login and get token
        const token = await loginAndGetToken(request)
        // publish article
        const responseBody = await publishArticle(request, token)

        // assertions
        assert(responseBody.article.title === apiData.articleData.article.title, 'Article title does not match')
        assert(responseBody.article.description === apiData.articleData.article.description, 'Article description does not match')
        assert(responseBody.article.body === apiData.articleData.article.body, 'Article body does not match')
        assert(JSON.stringify(responseBody.article.tagList) === JSON.stringify(apiData.articleData.article.tagList), 'Article tagList does not match')
    })

    test('', async ({request}) => {})
})