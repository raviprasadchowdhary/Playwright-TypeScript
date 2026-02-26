// Helper functiions

import { APIRequestContext } from "@playwright/test"
import { ApiData } from "./apiData"
const apiData = new ApiData()

// Helper function to get token
export async function loginAndGetToken(request: APIRequestContext): Promise<string> {    
    const responseBody = await login(request)
    return responseBody.user.token
}

// Helper function to login
export async function login(request: APIRequestContext): Promise<any> {
    const response = await request.post(`${apiData.baseURL}/users/login`, {
        data: apiData.loginData
    })

    const responseBody = await response.json()
    return responseBody
}

// Helper function to publish article
export async function publishArticle(request:APIRequestContext, token: string): Promise<any> {
    const response = await request.post(`${apiData.baseURL}/articles/`, {
            data: apiData.articleData,
            headers: {
                'Authorization': `Token ${token}`
            }
        })

        const responseBody = await response.json()
        return responseBody
}

// Helper function to get article by slug
export async function getArticle(request: APIRequestContext, token: string, slug: string): Promise<any> {
    const response = await request.get(`${apiData.baseURL}/articles/${slug}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    const getArticleResponseBody = await response.json()
    return getArticleResponseBody
}