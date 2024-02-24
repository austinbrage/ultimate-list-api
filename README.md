# Ultimate List API
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white) 

#### **The API controls resgister and log in of users, and the management of the proyects and ideas stored by the users.**

## Using the API

The API will be available at `http://localhost:3000`.

## Authentication

The API relies on headers, sending the signed token within the response body and receiving the same token within the authorization header, which must be stored manually in the client application.

## API Route

| Endpoint  | Description | 
| ------ | ------ |
| **`/ultimate-list`** | API Version 1 |

## User Routes

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/user/data`***** | **token** | Get all data from user |
| **POST ***`/user/key`***** | api_key | Sign in user ***(get token)*** |
| **POST ***`/user/login`***** | name, password | Sign in user ***(get token)*** |
| **POST ***`/user/oauth`***** | auth_provider, code | Open Auth User ***(get token)*** |
| **POST ***`/user/register`***** | name, password, email, nickname | Sign up user  ***(get token)***  |
| **PATCH ***`/user/name`***** | name, **token** | Change user name |
| **PATCH ***`/user/email`***** | email, **token** | Change user email |
| **PATCH ***`/user/nickname`***** | nickname, **token** | Change user nickname name |
| **PATCH ***`/user/password`***** | password, **token** | Change user password |
| **DELETE ***`/user/data`***** | **token** | Remove user |