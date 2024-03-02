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
| **POST ***`/knowledge/data`***** | name, type, description, **token** | Add new knowledge |
| **PATCH ***`/knowledge/name`***** | id, name, **token** | Change knowledge name |
| **PATCH ***`/knowledge/type`***** | id, type, **token** | Change knowledge type |
| **PATCH ***`/knowledge/priority`***** | id, priority, **token** | Change knowledge priority |
| **PATCH ***`/knowledge/description`***** | id, description, **token** | Change knowledge description |
| **DELETE ***`/knowledge/data`***** | id, **token** | Remove knowledge |

## Knowledge Concepts Routes

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/concept/data`***** | knowledge_id, **token** | Get all data from concept |
| **POST ***`/concept/data`***** | knowledge_id, name, type, description, **token** | Add new concept |
| **PATCH ***`/concept/name`***** | knowledge_id, id, name, **token** | Change concept name |
| **PATCH ***`/concept/type`***** | id, type, **token** | Change concept type |
| **PATCH ***`/concept/priority`***** | id, priority, **token** | Change concept priority |
| **PATCH ***`/concept/description`***** | id, description, **token** | Change concept description |
| **DELETE ***`/concept/data`***** | id, **token** | Remove concept |

## Research Routes

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/research/data`***** | **token** | Get all data from research |
| **POST ***`/research/data`***** | name, type, description, **token** | Add new research |
| **PATCH ***`/research/name`***** | id, name, **token** | Change research name |
| **PATCH ***`/research/type`***** | id, type, **token** | Change research type |
| **PATCH ***`/research/priority`***** | id, priority, **token** | Change research priority |
| **PATCH ***`/research/description`***** | id, description, **token** | Change research description |
| **DELETE ***`/research/data`***** | id, **token** | Remove research |

## Research Questions Routes

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/question/data`***** | research_id, **token** | Get all data from question |
| **POST ***`/question/data`***** | research_id, name, description, **token** | Add new question |
| **PATCH ***`/question/name`***** | research_id, id, name, **token** | Change question name |
| **PATCH ***`/question/priority`***** | id, priority, **token** | Change question priority |
| **PATCH ***`/question/description`***** | id, description, **token** | Change question description |
| **DELETE ***`/question/data`***** | id, **token** | Remove question |

## Research Question Answers Routes

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/answer/data`***** | question_id, **token** | Get all data from answer |
| **POST ***`/answer/data`***** | question_id, name, type, description, **token** | Add new answer |
| **PATCH ***`/answer/name`***** | question_id, id, name, **token** | Change answer name |
| **PATCH ***`/answer/type`***** | id, type, **token** | Change answer type |
| **PATCH ***`/answer/priority`***** | id, priority, **token** | Change answer priority |
| **PATCH ***`/answer/description`***** | id, description, **token** | Change answer description |
| **DELETE ***`/answer/data`***** | id, **token** | Remove answer |