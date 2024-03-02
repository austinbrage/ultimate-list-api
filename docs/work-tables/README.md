## Ideas Routes

| Endpoint | Queries | Description | 
| ------ | ------ | ------ |
| **GET ***`/idea/data`***** | **token** | Get all data from idea |
| **POST ***`/idea/data`***** | name, type, description, solved_problem, **token** | Add new idea |
| **PATCH ***`/idea/name`***** | id, name, **token** | Change idea name |
| **PATCH ***`/idea/type`***** | id, type, **token** | Change idea type |
| **PATCH ***`/idea/priority`***** | id, priority, **token** | Change idea priority |
| **PATCH ***`/idea/description`***** | id, description, **token** | Change idea description |
| **PATCH ***`/idea/solved-problem`***** | id, solved_problem, **token** | Change idea solved problem |
| **DELETE ***`/idea/data`***** | id, **token** | Remove idea |