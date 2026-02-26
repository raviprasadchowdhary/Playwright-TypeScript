// Helper functiions

import { APIRequestContext } from "@playwright/test"
import { ApiData } from "./apiData"
const apiData = new ApiData()

// Helper function to get token
export async function getToken(request: APIRequestContext): Promise<string> {
    const response = await request.post(`${apiData.baseURL}/users/login`, {
    data: apiData.loginData
    })

    const responseBody = await response.json()
    return responseBody.user.token
}