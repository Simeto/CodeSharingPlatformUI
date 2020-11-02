# Code Sharing Platform UI
```
  CSP uses the following technologies:
    1. Front-End
      - VueJS
      - Vuex
      - Bootstrap
      - SCSS
      - axios
    2. Back-End
      - NodeJS
      - Express
      - MongoDB
      - Mongoose
```
# The Project
```
A simple code-sharing platform that has two types of users - members and admins
Include:
  1. Authentication and Authorization
    - registration and login forms
    - Authentication on the Client and the Server side which ensures that a user has logged in
      before being able to perform actions requiring authentication
    - Authorization on the Server which can protect the certain API endpoints
      # server side - https://github.com/Simeto/CodeSharingPlatformServer
  2. Users (Members and Admins)
    2.1 Members
      - Can browse all shared snippets.
      - Can post code snippets.
      - Can like a snippet.
      - Can browse their personal snippets.
      - Can edit their own data like password , nickname, first name, etc.
      - Can add/edit an avatar.
      - Can delete their own profile
    2.2 Admins
      - Can browse all snippets.
      - Delete inappropriate ones if needed.
  3. Snippets
    - A single snippet consists of its code, the number of likes it has and a set of tags that categorize it.
    - Tags can be added or reused by users.
    - There cannot be two tags with the same name.
  4. Admin reports
    - The number of snippets per tag (e.g. AI(56), NodeJS(34))
    - The number of likes per tag

```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
