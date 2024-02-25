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

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/ping/api`***** | none | Verify API connection |
| **GET ***`/ping/database`***** | none | Verify DB connection |

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

## Knowledge Routes

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/knowledge/data`***** | **token** | Get all data from knowledge |
| **POST ***`/knowledge/data`***** | name, type, priority, description, **token** | Add new knowledge |
| **PATCH ***`/knowledge/name`***** | id, name, **token** | Change knowledge name |
| **PATCH ***`/knowledge/type`***** | id, type, **token** | Change knowledge type |
| **PATCH ***`/knowledge/priority`***** | id, priority, **token** | Change knowledge priority |
| **PATCH ***`/knowledge/description`***** | id, description, **token** | Change knowledge description |
| **DELETE ***`/knowledge/data`***** | id, **token** | Remove knowledge |

## Knowledge Concepts Routes

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/concept/data`***** | **token** | Get all data from concept |
| **POST ***`/concept/data`***** | knowledge_id, name, type, priority, description, **token** | Add new concept |
| **PATCH ***`/concept/name`***** | knowledge_id, id, name, **token** | Change concept name |
| **PATCH ***`/concept/type`***** | id, type, **token** | Change concept type |
| **PATCH ***`/concept/priority`***** | id, priority, **token** | Change concept priority |
| **PATCH ***`/concept/description`***** | id, description, **token** | Change concept description |
| **DELETE ***`/concept/data`***** | id, **token** | Remove concept |

## Research Routes

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/research/data`***** | **token** | Get all data from research |
| **POST ***`/research/data`***** | name, type, priority, description, **token** | Add new research |
| **PATCH ***`/research/name`***** | id, name, **token** | Change research name |
| **PATCH ***`/research/type`***** | id, type, **token** | Change research type |
| **PATCH ***`/research/priority`***** | id, priority, **token** | Change research priority |
| **PATCH ***`/research/description`***** | id, description, **token** | Change research description |
| **DELETE ***`/research/data`***** | id, **token** | Remove research |