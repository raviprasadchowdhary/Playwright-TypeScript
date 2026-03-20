import test from 'playwright/test'
import { assert } from 'node:console'
import { ApiData } from './apiData'
import {loginAndGetToken, publishArticle, getArticle, login, postComment, getComments, deleteComment, deleteArticle} from './helperFunctions'
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

    test('login, publish article & manage comments', async ({request}) => {
        // login and get token
        const token = await loginAndGetToken(request)
        // publish article
        const publishedArticleData = await publishArticle(request, token)
        // post comment
        const commentId = await postComment(request, token, publishedArticleData.article.slug, apiData.commentData)
        // get comments
        const comments = await getComments(request, token, publishedArticleData.article.slug)
        // list comment ids
        const commentIds = comments.comments.map((comment: any) => comment.id)
        console.log('Comment IDs: ', commentIds)
        // assertions
        assert(commentIds.includes(commentId), 'Comment ID not found in list of comments for the article')
        // delete comment
        deleteComment(request, token, publishedArticleData.article.slug, commentId)
        // get comments again
        const commentsAfterDeletion = await getComments(request, token, publishedArticleData.article.slug)
        // list comment ids again
        const commentIdsAfterDeletion = commentsAfterDeletion.comments.map((comment: any) => comment.id)
        console.log('Comment IDs after deletion: ', commentIdsAfterDeletion)
        // assertion to verify comment deletion
        assert(!commentIdsAfterDeletion.includes(commentId), 'Comment ID still found in list of comments for the article after deletion')
    })

    test('login, publish article & manage article', async ({request}) => {
        // login and get token
        const token = await loginAndGetToken(request)
        // publish article
        const publishedArticleData = await publishArticle(request, token)
        // get article using slug
        const getArticleResponseBody = await getArticle(request, token, publishedArticleData.article.slug)
        // assertions
        assert(getArticleResponseBody.article.title === publishedArticleData.article.title, `Article title does not match; expected: ${publishedArticleData.article.title}, actual: ${getArticleResponseBody.article.title}`)
        // delete article using slug
        await deleteArticle(request, token, publishedArticleData.article.slug)
        // get article again using slug - this should ideally return an error or a response indicating that the article is not found
        try {
            const getArticleResponseBodyAfterDeletion = await getArticle(request, token, publishedArticleData.article.slug)
            assert(getArticleResponseBodyAfterDeletion.errors.article[0] === 'not found', `Expected article not found error, but got: ${JSON.stringify(getArticleResponseBodyAfterDeletion)}`)
        } catch (error) {
            assert(error instanceof Error, `Expected an error to be thrown when trying to get a deleted article, but got: ${error}`)
            console.log('Error message when trying to get deleted article: ', error)
        }
    })
})