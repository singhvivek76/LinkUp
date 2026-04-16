# LinkUp

LinkUp is a full-stack social networking app with a Node.js/Express/MongoDB backend and a Next.js frontend. The backend handles authentication, profiles, posts, connections, comments, and file uploads, while the frontend provides the user-facing pages, layouts, and Redux-powered state management.

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Multer for uploads
- bcrypt for password hashing
- PDFKit / pdf-creator-node for resume or profile PDF generation

### Frontend
- Next.js
- React
- Redux Toolkit
- React Redux
- Axios
- CSS Modules

## Project Structure

```text
LinkUp/
|-- README.md
|-- .env
|-- .gitignore
|-- backend/
|   |-- api.http
|   |-- package.json
|   |-- package-lock.json
|   |-- server.js
|   |-- controllers/
|   |   |-- posts.controller.js
|   |   `-- user.controller.js
|   |-- models/
|   |   |-- comments.model.js
|   |   |-- connections.model.js
|   |   |-- posts.model.js
|   |   |-- profile.model.js
|   |   `-- user.model.js
|   |-- routes/
|   |   |-- posts.routes.js
|   |   `-- user.routes.js
|   |-- uploads/
|   |   `-- user-uploaded media and generated files
|   `-- node_modules/
|       `-- backend dependencies
`-- frontend/
    |-- AGENTS.md
    |-- CLAUDE.md
    |-- eslint.config.mjs
    |-- jsconfig.json
    |-- next.config.mjs
    |-- package.json
    |-- package-lock.json
    |-- public/
    |   `-- images/
    |       `-- default.jpg
    `-- src/
        |-- components/
        |   `-- Navbar/
        |       |-- index.jsx
        |       `-- styles.module.css
        |-- config/
        |   |-- index.jsx
        |   `-- redux/
        |       |-- store.js
        |       |-- action/
        |       |   |-- authAction/
        |       |   |   `-- index.js
        |       |   `-- postAction/
        |       |       `-- index.js
        |       `-- reducer/
        |           |-- authReducer/
        |           |   `-- index.js
        |           `-- postReducer/
        |               `-- index.js
        |-- layout/
        |   |-- DashboardLayout/
        |   |   |-- index.jsx
        |   |   `-- index.module.css
        |   `-- UserLayout/
        |       `-- index.jsx
        |-- pages/
        |   |-- _app.js
        |   |-- _document.js
        |   |-- index.jsx
        |   |-- api/
        |   |   `-- hello.js
        |   |-- dashboard/
        |   |   |-- index.jsx
        |   |   `-- index.module.css
        |   |-- discover/
        |   |   |-- index.jsx
        |   |   `-- index.module.css
        |   |-- login/
        |   |   |-- index.jsx
        |   |   `-- style.module.css
        |   |-- my_connections/
        |   |   |-- index.jsx
        |   |   `-- index.module.css
        |   |-- profile/
        |   |   |-- index.jsx
        |   |   `-- index.module.css
        |   `-- view_profile/
        |       |-- [username].jsx
        |       |-- [username]-test.jsx
        |       `-- index.module.css
        `-- styles/
            |-- globals.css
            `-- Home.module.css
```


## Environment Variables

The backend expects:

```env
MONGO_URI=your_mongodb_connection_string
```

The backend loads this from either:
- `backend/.env`
- root `.env`

## Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:9080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000` by default.