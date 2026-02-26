import test from 'playwright/test'
import { assert } from 'node:console'
import { ApiData } from './apiData'
import {loginAndGetToken, publishArticle, getArticle, login} from './helperFunctions'
const apiData = new ApiData()

test.describe('API request tests', () => {
    test('login', async ({request}) => {
        // login and get response body
        const responseBody = await login(request)

        // assertions
        assert(responseBody.user.email === apiData.userEmail, 'Email does not match')
        assert(responseBody.user.username === apiData.userEmail.split('@')[0], 'Username does not match')
    })

    test('login & publish article', async ({request}) => {
        // login and get token
        const token = await loginAndGetToken(request)
        // publish article
        const responseBody = await publishArticle(request, token)

        // assertions
        // assert(responseBody.article.title === apiData.articleData.article.title, 'Article title does not match')
        assert(responseBody.article.description === apiData.articleData.article.description, 'Article description does not match')
        assert(responseBody.article.body === apiData.articleData.article.body, 'Article body does not match')
        assert(JSON.stringify(responseBody.article.tagList) === JSON.stringify(apiData.articleData.article.tagList), 'Article tagList does not match')
    })

    test('login, publish article & get article', async ({request}) => {
        // login and get token
        const token = await loginAndGetToken(request)
        // publish article
        const publishedArticleData = (await publishArticle(request, token))
        // get article using slug
        const getArticleResponseBody = await getArticle(request, token, publishedArticleData.article.slug)

        // assertions
        assert(getArticleResponseBody.article.title === publishedArticleData.article.title, `Article title does not match; expected: ${publishedArticleData.article.title}, actual: ${getArticleResponseBody.article.title}`)
        assert(getArticleResponseBody.article.slug === publishedArticleData.article.slug, `Article slug does not match; expected: ${publishedArticleData.article.slug}, actual: ${getArticleResponseBody.article.slug}`)
        assert(getArticleResponseBody.article.description === publishedArticleData.article.description, `Article description does not match; expected: ${publishedArticleData.article.description}, actual: ${getArticleResponseBody.article.description}`)
        assert(getArticleResponseBody.article.body === publishedArticleData.article.body, `Article body does not match; expected: ${publishedArticleData.article.body}, actual: ${getArticleResponseBody.article.body}`)
        assert(JSON.stringify(getArticleResponseBody.article.tagList) === JSON.stringify(publishedArticleData.article.tagList), `Article tagList does not match; expected: ${JSON.stringify(publishedArticleData.article.tagList)}, actual: ${JSON.stringify(getArticleResponseBody.article.tagList)}`)
    })
})