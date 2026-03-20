export class ApiData {
    baseURL = 'https://conduit-api.bondaracademy.com/api'
    userEmail = 'conduit001@gmail.com'
    userPassword = 'conduit001'
    loginData = {
        "user": {
            "email": this.userEmail,
            "password": this.userPassword
        }
    }

    articleDataTitle = "This is Article Title - by Raviprasad" + random6Digits()
    articleData = {
                    "article": {
                        "title": this.articleDataTitle,
                        "description": "This is about - by Raviprasad",
                        "body": "# 🧪 Introduction to Software Testing\n\nSoftware testing is a critical phase in the software development lifecycle. It ensures that an application meets the required quality standards, functions as expected, and delivers a reliable experience to users. Effective testing reduces the cost of bugs, improves product stability, and enhances overall customer satisfaction.\n\n---\n\n## ✅ Why Testing Matters\n\nSoftware testing helps in:\n\n- **Identifying defects early** before they reach the end user.\n- **Ensuring functionality works as intended.**\n- **Improving performance, security, and usability.**\n- **Building confidence** in the software before deployment.\n\n---\n\n## 🧰 Types of Testing\n\n### **1. Manual Testing**\nTesting performed by human testers without automation tools. Useful for exploratory, usability, and ad‑hoc testing.\n\n### **2. Automation Testing**\nUses scripts or tools to perform repetitive tests. Ideal for regression, performance, and load testing.\n\n### **3. Functional Testing**\nVerifies that each feature works according to requirements. Examples include unit tests, integration tests, and system tests.\n\n### **4. Non‑Functional Testing**\nValidates aspects like performance, scalability, and security. Examples include load testing and stress testing.\n\n---\n\n## ⚙️ Common Testing Tools\n\n- **Selenium** – Web automation  \n- **Playwright** – Modern browser automation  \n- **Pytest** – Python-based testing framework  \n- **JMeter** – Performance testing  \n\n---\n\n## 🏁 Conclusion\n\nTesting ensures that software is **reliable**, **secure**, and **user-friendly**. By combining manual and automated strategies, development teams can deliver high‑quality products efficiently and confidently.",
                        "tagList": [
                            "Raviprasad"
                        ]
                    }
                }

    commentData = {
                    "comment": {
                    "body": "comment - by Raviprasad"
 
                }
    }
}

function random6Digits(): string{
    return Math.floor(100000 + Math.random() * 900000).toString()
}