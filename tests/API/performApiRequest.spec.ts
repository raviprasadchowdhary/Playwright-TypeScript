import test from 'playwright/test'
import { request } from 'playwright'
import { APIRequestContext } from '@playwright/test'
import { assert } from 'node:console'

const baseURL = 'https://conduit-api.bondaracademy.com/api'
const userEmail = 'conduit001@gmail.com'
const userPassword = 'conduit001'
const loginData = {
    "user": {
        "email": userEmail,
        "password": userPassword
    }
}

const articleDataTitle = "This is Article Title - by Raviprasad" + random6Digits()
const articleData = {
                "article": {
                    "title": articleDataTitle,
                    "description": "This is about - by Raviprasad",
                    "body": "# 🧪 Introduction to Software Testing\n\nSoftware testing is a critical phase in the software development lifecycle. It ensures that an application meets the required quality standards, functions as expected, and delivers a reliable experience to users. Effective testing reduces the cost of bugs, improves product stability, and enhances overall customer satisfaction.\n\n---\n\n## ✅ Why Testing Matters\n\nSoftware testing helps in:\n\n- **Identifying defects early** before they reach the end user.\n- **Ensuring functionality works as intended.**\n- **Improving performance, security, and usability.**\n- **Building confidence** in the software before deployment.\n\n---\n\n## 🧰 Types of Testing\n\n### **1. Manual Testing**\nTesting performed by human testers without automation tools. Useful for exploratory, usability, and ad‑hoc testing.\n\n### **2. Automation Testing**\nUses scripts or tools to perform repetitive tests. Ideal for regression, performance, and load testing.\n\n### **3. Functional Testing**\nVerifies that each feature works according to requirements. Examples include unit tests, integration tests, and system tests.\n\n### **4. Non‑Functional Testing**\nValidates aspects like performance, scalability, and security. Examples include load testing and stress testing.\n\n---\n\n## ⚙️ Common Testing Tools\n\n- **Selenium** – Web automation  \n- **Playwright** – Modern browser automation  \n- **Pytest** – Python-based testing framework  \n- **JMeter** – Performance testing  \n\n---\n\n## 🏁 Conclusion\n\nTesting ensures that software is **reliable**, **secure**, and **user-friendly**. By combining manual and automated strategies, development teams can deliver high‑quality products efficiently and confidently.",
                    "tagList": [
                        "Raviprasad"
                    ]
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

    test('login & Publish article', async ({request}) => {
        const token = await getToken(request)

        const response = await request.post(`${baseURL}/articles/`, {
            data: articleData,
            headers: {
                'Authorization': `Token ${token}`
            }
        })

        const responseBody = await response.json()
        // console.log(`Response: ${JSON.stringify(responseBody)}`)
        console.log(responseBody)

        assert(responseBody.article.title === articleData.article.title, 'Article title does not match')
        assert(responseBody.article.description === articleData.article.description, 'Article description does not match')
        assert(responseBody.article.body === articleData.article.body, 'Article body does not match')
        assert(JSON.stringify(responseBody.article.tagList) === JSON.stringify(articleData.article.tagList), 'Article tagList does not match')
    })
})

// Helper functiions
// Helper function to get token
async function getToken(request: APIRequestContext): Promise<string> {
    const response = await request.post(`${baseURL}/users/login`, {
    data: loginData
    })

    const responseBody = await response.json()
    return responseBody.user.token
}

// Helper function to generate random 6 digit number
function random6Digits(): string{
    return Math.floor(100000 + Math.random() * 900000).toString()
}