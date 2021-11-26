## Description

This project is a clone of trello board built with the javascript library react-beautiful-dnd.

## Purpose

This project was created to demonstrate my skills working with React.js

## Features

- CRUD repos and cards
- Drag and drop cards

## Configuration

- Create .env file for docker-compose

```sh
cp .env.example .env
```

- Create .env file for front-end

```sh
cd frontend
cp .env.example .env
```

## Running production

```sh
docker-compose up --build -d
```

Go to: http://localhost:${FRONTEND_PORT}

## Running development

```sh
cd frontend
npm run start
```

Go to: http://localhost:3000

## Testing

### Unit test

```sh
cd frontend
npm run test
```

### E2E test

Update `baseUrl` in /frontend/wdio.conf.js file

```sh
cd frontend
npm run wdio
```

## Linting

```sh
cd frontend
npm run lint
npm run lint:fix
npm run format
```

## Libraries used

react, react-router, react-icons, react-beautiful-dnd, tailwindcss, axios, typescropt
